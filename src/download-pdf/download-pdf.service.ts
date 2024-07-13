import { Inject, Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { EmployeeService } from 'src/employee/employee.service';
import { htmlTemplate, keys } from './html.template';

@Injectable()
export class DownloadPdfService {
  constructor(
    @Inject(EmployeeService)
    private employeeService: EmployeeService,
  ) {}

  async downloadEmpEvalPages(id: string): Promise<Buffer> {
    const data: any = await this.employeeService.findOneUserEvaluation(id);

    if (!data) {
      throw new Error('No data found for the given ID');
    }

    const {
      user,
      ratings,
      lineManagerDetails,
      ceoDetails,
      date,
      reviewPeriod,
    } = data.data;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    const downloadDataValues = {
      name: user?.name,
      achievedGoalsCurrentYear: user?.achievedGoalsCurrentYear,
      setNextReviewGoal: user?.setNextReviewGoal,
      empSignature: user?.empSignature,
      employeeID: user?.employeeID,
      title: user?.title,
      department: user?.department,
      manager: user?.manager,
      date,
      reviewPeriod,
      achievedGoals: lineManagerDetails?.achievedGoals,
      nextReviewGoal: lineManagerDetails?.nextReviewGoal,
      strength: lineManagerDetails?.strength,
      improvement: lineManagerDetails?.improvement,
      trainingRecommendation: lineManagerDetails?.trainingRecommendation,
      salaryIncrement: lineManagerDetails?.salaryIncrement,
      position: lineManagerDetails?.position,
      ceoIncrement: ceoDetails?.salaryIncrement,
      ceoPositon: ceoDetails?.position,
      remarks: ceoDetails?.remarks,
      managerSignature: lineManagerDetails?.signature,
      ceoSignature: ceoDetails?.signature,
      ques: ratings,
    };

    await page.setContent(htmlTemplate(keys.ALL_PAGE, downloadDataValues));

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return pdfBuffer;
  }
}
