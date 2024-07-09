export const keys = {
  ALL_PAGE: 'All page',
  PAGE__1: 'page-1',
  PAGE__2: 'page-2',
  PAGE__3: 'page-3',
};

const commonStyle = `<style>
  body {
    font-size: 10px !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  h1 {
    font-size: 24px !important;
  }
  h2 {
    font-size: 16px !important;
  }
  table {
    width: 100% !important;
    border-collapse: collapse !important;
    font-size: 10px !important;
  }
  th, td {
    border: 1px solid #ddd !important;
    padding: 8px !important;
  }

  .page-break {
    page-break-before: always;
  }

  .container {
    padding: 24px 16px;
  }
</style>`;

const commonCdn = `
  <script src="https://cdn.tailwindcss.com"></script>
`;

export const htmlTemplate = (key: string, values: any) => {
  console.log(values?.achievedGoals);
  switch (key) {
    case keys.ALL_PAGE:
      return generatePage1(values);
    default:
      throw new Error(`Invalid key: ${key}`);
  }
};

const generatePage1 = ({
  // page 1 data
  name,
  employeeID,
  title,
  department,
  manager,
  date,
  reviewPeriod,
  ques,

  // page 2 data
  achievedGoals,
  nextReviewGoal,
  strength,
  improvement,
  trainingRecommendation,

  // Page 3 data
  salaryIncrement,
  position,
  ceoIncrement,
  ceoPositon,
  remarks,
  managerSignature,
  ceoSignature,
}) => {
  return `
    <html>
    <head>
      <title>Employee Evaluation Form</title>
      ${commonStyle}
      ${commonCdn}
    </head>
    <body class="px-8 py-4">
      <div class="max-w-6xl mx-auto my-5">
        <!-- Page Header section -->
        <div class="flex justify-between px-6">
          <img src="https://employee-performance-review.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75" alt="HDML" width="200" height="200" />
          <h1 class="font-bold">HawkEyes Digital Monitoring Limited</h1>
        </div>

        <!-- Page 1 Starts -->
        <div>
          <div class="container mx-auto">
            <h2 class="font-bold border-black my-0">Employee Evaluation Form</h2>
            <h2 class=" font-bold text-center border p-2 border-black mb-2">EMPLOYEE INFORMATION</h2>
            <table class="w-full mb-4">
              <tbody>
                <tr>
                  <td class="border border-gray-300 p-2">Name</td>
                  <td class="border border-gray-300 p-2"><p>${
                    name || ''
                  }</p></td>
                  <td class="border border-gray-300 p-2">Employee ID</td>
                  <td class="border border-gray-300 p-2"><p>${
                    employeeID || ''
                  }</p></td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2">Job Title</td>
                  <td class="border border-gray-300 p-2"><p>${
                    title || ''
                  }</p></td>
                  <td class="border border-gray-300 p-2">Date</td>
                  <td class="border border-gray-300 p-2">
                    <p>${new Date(date).toLocaleDateString('en-GB', {
                      timeZone: 'Asia/Dhaka',
                    })}</p>
                      </td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2">Department</td>
                  <td class="border border-gray-300 p-2"><p>${
                    department || ''
                  }</p></td>
                  <td class="border border-gray-300 p-2">Manager Name</td>
                  <td class="border border-gray-300 p-2"><p>${
                    manager?.name || ''
                  }</p></td>
                </tr>
                <tr>
                  <td class="border border-gray-300 p-2">Review Period</td>
                  <td class="border border-gray-300 p-2"><p>${
                    reviewPeriod || ''
                  }</p></td>
                </tr>
              </tbody>
            </table>

            <h2 class=" font-bold text-center border p-0 border-black mb-2">RATINGS</h2>
            <table class="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th class="border border-gray-200 p-2">Category</th>
                  ${[1, 2, 3, 4, 5]
                    ?.map(
                      (num) => `
                  <th class="border border-gray-200 p-2">${num} = ${
                        ['Poor', 'Fair', 'Satisfactory', 'Good', 'Excellent'][
                          num - 1
                        ]
                      }</th>
                  `,
                    )
                    ?.join('')}
                </tr>
              </thead>
              <tbody>
                ${ques
                  ?.map(
                    (category) => `
                <tr key="${category?.ques}">
                  <td class="border border-gray-200 p-2">${
                    category?.ques || ''
                  }</td>
                  ${[1, 2, 3, 4, 5]
                    ?.map(
                      (value) => `
                  <td class="border border-gray-200 p-2 text-center">
                    <p>${category?.ans == value ? '✔' : ''}</p>
                  </td>
                  `,
                    )
                    ?.join('')}
                </tr>
                <tr key="${category?.ques}-comments">
                  <td class="border border-gray-200 p-2">Comments</td>
                  <td class="border border-gray-200 p-2" colSpan="5">
                    <p>${category?.comments || ''}</p>
                  </td>
                </tr>
                `,
                  )
                  ?.join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Page 1 Ends -->

    <!-- Page 2 Starts -->
    <div class="page-break"></div>
    <div class="container mx-auto my-5">
        <h2 class=" font-bold text-center border p-2 border-black">EVALUATION & RECOMMENDATION FOR LINE MANAGER</h2>
        <table class="w-full mb-10">
          <tbody>
            <tr>
              <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
                ACHIEVED GOALS SET IN PREVIOUS REVIEW
              </td>
            </tr>
            <tr class="h-[200px]">
              <td colSpan="7" class="border border-gray-300 p-2 align-top">
                ${
                  achievedGoals &&
                  achievedGoals?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                    ? achievedGoals
                        ?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                        ?.map((item) => `<p>${item}</p>`)
                        ?.join('')
                    : achievedGoals &&
                      !achievedGoals?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                    ? achievedGoals
                    : ''
                }
              </td>
            </tr>
            <tr>
              <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
                GOALS FOR NEXT REVIEW PERIOD
              </td>
            </tr>
           <tr class="h-[200px]">
              <td colSpan="7" class="border border-gray-300 p-2 align-top">
              
               ${
                 nextReviewGoal &&
                 nextReviewGoal?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                   ? nextReviewGoal
                       ?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                       ?.map((item) => `<p>${item}</p>`)
                       ?.join('')
                   : nextReviewGoal &&
                     !nextReviewGoal?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                   ? nextReviewGoal
                   : ''
               }
              </td>
            </tr>
            <tr>
              <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
                Strength
              </td>
            </tr>
            <tr class="h-[200px]">
              <td colSpan="7" class="border border-gray-300 p-2 align-top">

              ${
                strength && strength?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                  ? strength
                      ?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                      ?.map((item) => `<p>${item}</p>`)
                      ?.join('')
                  : strength && !strength?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                  ? strength
                  : ''
              }
               
              </td>
            </tr>
            <tr>
              <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
                Area of Improvement
              </td>
            </tr>
            <tr class="h-[200px]">
              <td colSpan="7" class="border border-gray-300 p-2 align-top">
              ${
                improvement && improvement?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                  ? improvement
                      ?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                      ?.map((item) => `<p>${item}</p>`)
                      ?.join('')
                  : improvement &&
                    !improvement?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                  ? improvement
                  : ''
              }
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>

    <!-- Page 2 Ends -->

    <!-- Page 3 Starts -->
    <div class="page-break"></div>
    <div class="container mx-auto my-5">
        <table class="w-full mb-10">
          <tbody>
           <tr>
              <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
                Training / Development Recommendation
              </td>
            </tr>
            <tr class="h-[200px]">
              <td colSpan="7" class="border border-gray-300 p-2 align-top">
               ${
                 trainingRecommendation &&
                 trainingRecommendation?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                   ? trainingRecommendation
                       ?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                       ?.map((item) => `<p>${item}</p>`)
                       ?.join('')
                   : trainingRecommendation &&
                     !trainingRecommendation?.match(
                       /\d+\..*?(?=\d+\.)|\d+\..*/g,
                     )
                   ? trainingRecommendation
                   : ''
               }
               
              </td>
          </tr>
          <tr>
            <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
              RECOMMENDATION
            </td>
          </tr>
          <tr>
            <td colSpan="7" class="border border-gray-300 p-2">
              <ul>
                <li><strong>Position:</strong> ${position || ''}</li>
              </ul>
              <ul>
                <li><strong>Salary Increment:</strong> ${
                  salaryIncrement || ''
                }</li>
              </ul>
            </td>
          </tr>
             <tr>
              <td colspan="3" class="border border-gray-300 p-2 text-center font-bold h-[100px] align-bottom">
                  <p>${manager?.name ? manager.name : ''}</p>
                  <p class="mt-3">LINE MANAGER</p>
                </td>
                <td colspan="4" class="h-[100px] border border-gray-300 p-2 text-center font-bold flex flex-col justify-center items-center gap-y-2">
                    <img src="${managerSignature}" alt="CEO Signature" style="max-width: 200px; max-height: 80px;" class="h-[50px]">
                    <p>SIGNATURE & DATE</p>
                </td>
              </tr>
          </tbody>
        </table>

          <div class="">
             <h2 class=" font-bold text-center border p-2 border-black">EVALUATION & APPROVAL BY MD & CEO</h2>
              <table class="w-full mb-10">
              <tbody>
                <tr>
                  <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
                    REMARKS
                  </td>
                </tr>
                <tr class="h-[300px]">
                <td colSpan="7" class="border border-gray-300 p-2 align-top">
                 ${
                   remarks && remarks?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                     ? remarks
                         ?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                         ?.map((item) => `<p>${item}</p>`)
                         ?.join('')
                     : remarks && !remarks?.match(/\d+\..*?(?=\d+\.)|\d+\..*/g)
                     ? remarks
                     : ''
                 }
               
                </td>
                </tr>
               
               <tr>
            <td colSpan="7" class="border border-gray-300 p-2 text-center font-bold">
                FINAL EVALUATION
            </td>
          </tr>
              <tr>
                <td colSpan="7" class="border border-gray-300 p-2">
                <ul>
                    <li><strong>Salary Increment:</strong> ${
                      ceoIncrement || ''
                    }</li>
                  </ul>
                  <ul>
                    <li><strong>Position:</strong> ${ceoPositon || ''}</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td colspan="3" class="border border-gray-300 p-2 text-center font-bold h-[100px] align-bottom">
                  <p>MIRZA FERDOUS OHID</p>
                  <p class="mt-3">MD & CEO</p>
                </td>
                 <td colspan="4" class="h-[100px] border border-gray-300 p-2 text-center font-bold flex flex-col justify-center items-center gap-y-2">
                    <img src="${ceoSignature}" alt="CEO Signature" style="max-width: 200px; max-height: 100px;" class="h-[50px]">
                    <p>SIGNATURE & DATE</p>
                </td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
    <!-- Page 3 Ends -->
    </body>
    </html>
  `;
};
