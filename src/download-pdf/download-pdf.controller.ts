import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DownloadPdfService } from './download-pdf.service';

@ApiTags('Download PDF')
@Controller('download-pdf')
export class DownloadPdfController {
  constructor(private downloadPdfService: DownloadPdfService) {}

  @ApiBearerAuth()
  @Get('downoad-pages/:id')
  @ApiOperation({ summary: 'Download All Pages of Employeee Evaluation' })
  async downloadPdfForStudnetNLabor(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    const buffer = await this.downloadPdfService.downloadEmpEvalPages(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=emp-eval-pages.pdf',
      'Content-Length': buffer?.length?.toString(),
    });

    res.end(buffer);
  }
}
