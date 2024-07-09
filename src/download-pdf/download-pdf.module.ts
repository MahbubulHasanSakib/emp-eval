import { Module } from '@nestjs/common';
import { DownloadPdfController } from './download-pdf.controller';
import { DownloadPdfService } from './download-pdf.service';

@Module({
  controllers: [DownloadPdfController],
  providers: [DownloadPdfService],
})
export class DownloadPdfModule {}
