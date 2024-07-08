import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Inject,
  Param,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { FileUploadDto } from './dto/file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as sharp from 'sharp';
import { ApiConfigService } from '../api-config/api-config.service';

@ApiBearerAuth()
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(
    @Inject('S3_CLIENT') private readonly s3Client: S3Client,
    private readonly apiConfigService: ApiConfigService,
    private readonly uploadService: UploadService,
  ) {}

  /*@Post(':folder/:date')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiParam({
    name: 'folder',
    type: 'string',
    example: 'attendance',
  })
  @ApiParam({
    name: 'date',
    type: 'string',
    example: '7-12-2023',
  })
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      thumbnail: { suffix: 'thumb', width: 200, height: 200 },
      fileFilter(req, file, callback) {
        if (!/(PNG|JPEG|PDF|MP4)/i.test(file.mimetype)) {
          callback(new BadRequestException(), false);
        }
        callback(null, true);
      },
      dynamicPath: ['folder', 'date'],
      limits: { fileSize: 100000000 },
    }),
  )
  create(@UploadedFile() file) {
    if (/(PNG|JPEG)/i.test(file.mimetype)) {
      return {
        message: 'Image upload successfully.',
        data: {
          thumb: file.thumb.Location,
          original: file.original.Location,
        },
      };
    }
    return {
      message: 'File upload successfully.',
      data: {
        fileUrl: file.Location.startsWith('https://')
          ? file.Location
          : `https://${file.Location}`,
      },
    };
  }*/

  @Post(':folder/:date')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiParam({
    name: 'folder',
    type: 'string',
    example: 'resource',
  })
  @ApiParam({
    name: 'date',
    type: 'string',
    example: '02-02-2024',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadWithThumbnail(
    @Param() param: Record<'folder' | 'date', string>,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000000 }),
          new FileTypeValidator({
            fileType: new RegExp('(PNG|JPEG|JPG|PDF|MP4)', 'i'),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const bucket = this.apiConfigService.getBucket;
    const basePath = this.apiConfigService.getBasePath;
    const fileKey = `${basePath}/${param.folder}/${param.date}/${file.originalname}`;
    const endpoint = this.apiConfigService.getEndpoint
      .split('https://')
      .join('');
    if (/(PNG|JPEG)/i.test(file.mimetype)) {
      const originalKey = `${fileKey}-original`;
      const thumbKey = `${fileKey}-thumb`;
      const thumbnailImage = await sharp(file.buffer)
        .resize(200, 200)
        .toBuffer();
      const uploadOriginal = this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: originalKey,
          ContentType: file.mimetype,
          Body: file.buffer,
          ACL: 'public-read',
        }),
      );
      const uploadThumbnail = this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: thumbKey,
          ContentType: file.mimetype,
          Body: thumbnailImage,
          ACL: 'public-read',
        }),
      );
      await Promise.all([uploadOriginal, uploadThumbnail]);
      return {
        message: 'Image upload successfully.',
        data: {
          original: `https://${bucket}.${endpoint}/${originalKey}`,
          thumb: `https://${bucket}.${endpoint}/${thumbKey}`,
        },
      };
    } else {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: fileKey,
          ContentType: file.mimetype,
          Body: file.buffer,
          ACL: 'public-read',
        }),
      );
      return {
        message: 'File upload successfully.',
        data: {
          fileUrl: `https://${bucket}.${endpoint}/${fileKey}`,
        },
      };
    }
  }
}
