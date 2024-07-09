import { Module } from '@nestjs/common';
import { DownloadPdfController } from './download-pdf.controller';
import { DownloadPdfService } from './download-pdf.service';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [EmployeeModule],
  controllers: [DownloadPdfController],
  providers: [DownloadPdfService],
})
export class DownloadPdfModule {}
