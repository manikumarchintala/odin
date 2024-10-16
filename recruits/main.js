document.addEventListener("DOMContentLoaded", async () => {
  let bloodPressureChart;
  async function FetchData() {
    try {
      const username = "coalition";
      const password = "skills-test";
      const headers = new Headers();
      const token = btoa(`${username}:${password}`);
      headers.append("Authorization", `Basic ${token}`);
      const response = await fetch(
        "https://fedskillstest.coalitiontechnologies.workers.dev",
        {
          method: "GET",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const futuredata = await response.json();
      console.log(futuredata);
      let patientHolder = document.getElementById("patientlistholder");
      let profileholder = document.getElementById("lastholder--profile");
      let labResultsHolder = document.getElementById(
        "lastholder--labresults__holder"
      );
      let imagesdata = document.querySelector(
        ".middleholder--graphcharts__data"
      );
      futuredata.forEach((patient) => {
        const patientDiv = document.createElement("div");
        patientDiv.className = "maincontent--patientlist__list";
        patientDiv.innerHTML = `
        <div class="maincontent--patientlist__listflex">
        <img src="${patient.profile_picture}" width="48" height="48" alt="${patient.name}">
              <div class="maincontent--patientlist__listtext">
                  <h5>${patient.name}</h5>
                  <p>${patient.gender}, ${patient.age}</p>
              </div>
        </div>
              <img src="./images/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="More options">
            `;
        patientDiv.addEventListener("click", () => {
          //
          document
            .querySelectorAll(".maincontent--patientlist__list")
            .forEach((item) => {
              item.classList.remove("selected-patient");
            });
          patientDiv.classList.add("selected-patient");
          //

          profileholder.innerHTML = "";
          imagesdata.innerHTML = "";
          imagesdata.innerHTML = `
          <div class = "middleholder--graphcharts__datadynamic" >
          <img src="./images/respiratory rate.svg" alt ="lungs" >
          <p>Respiratory Rate</p>
          <h2>${patient.diagnosis_history[0].respiratory_rate.value}</h2>
          <p>${patient.diagnosis_history[0].respiratory_rate.levels}</p>
          </div>
          <div class = "middleholder--graphcharts__datadynamic" >
          <img src="./images/temperature.svg" alt="temperature" >
           <p>Temparature</p>
          <h2>${patient.diagnosis_history[0].temperature.value}</h2>
          <p>${patient.diagnosis_history[0].temperature.levels}</p>
          </div>
          <div class = "middleholder--graphcharts__datadynamic" >
          <img src="./images/HeartBPM.svg" alt="Heart" >
           <p>Heart Rate Rate</p>
          <h2>${patient.diagnosis_history[0].heart_rate.value}</h2>
          <p>${patient.diagnosis_history[0].heart_rate.levels}</p>
          </div>
          `;

          const patientProfile = document.createElement("div");
          patientProfile.className = "lastholder--profile__imgname";
          patientProfile.innerHTML = `
                <img src="${patient.profile_picture}" width="120" height="120" alt="${patient.name}">
                <h5>${patient.name}</h5>
              `;

          const patientProp = document.createElement("div");
          patientProp.className = "lastholder--profile__props";
          patientProp.innerHTML = `
                    <div class = "lastholder--profile__propsflex" >
                    <img src = "./images/BirthIcon.svg"  alt="scheduletoday">
                    <div>
                    <h5>Date of Birth</h5>
                    <p>${patient.date_of_birth}</p>
                    </div> 
                    </div>
                    <div class = "lastholder--profile__propsflex" >
                    <img src = "./images/Femaleicon.svg" alt="scheduletoday">
                    <div>
                     <h5>Gender</h5>
                    <p>${patient.gender}</p>
                    </div>
                    </div>
                    <div class = "lastholder--profile__propsflex"  >
                    <img src = "./images/Phoneicon.svg" alt="scheduletoday">
                    <div>
                    <h5>Contact Info</h5>
                    <p>${patient.phone_number}</p>
                    </div>
                    </div>
                      <div class = "lastholder--profile__propsflex"  > 
                    <img src = "./images/Phoneicon.svg" alt="scheduletoday">
                    <div>
                    <h5>Emergency Contact</h5>
                    <p>${patient.emergency_contact}</p>
                    </div>
                    </div>
                    <div class = "lastholder--profile__propsflex"  > 
                    <img src = "./images/Insuranceicon.svg" alt="scheduletoday">
                    <div>
                    <h5>Insurance Provider</h5>
                    <p>${patient.insurance_type}</p>
                    </div> 
                    </div>
                    <div class = "lastholder--profile__propsflexholder" >
                     <button class = "lastholder--profile__propsflexbutton" >Show All Information</button>
                    </div> 
                  `;

          profileholder.appendChild(patientProfile);
          profileholder.appendChild(patientProp);
          let detailsHolder = document.querySelector(
            ".middleholder--graphcharts__listdetails"
          );
          detailsHolder.innerHTML = "";
          labResultsHolder.innerHTML = "";
          const diagnosisHistory = patient.diagnosis_history;
          const labels = diagnosisHistory.map(
            (item) => item.month + " " + item.year
          );
          const systolic = diagnosisHistory.map(
            (item) => item.blood_pressure.systolic.value
          );
          const diastolic = diagnosisHistory.map(
            (item) => item.blood_pressure.diastolic.value
          );

          const ctx = document
            .getElementById("bloodPressureChart")
            .getContext("2d");
          if (bloodPressureChart) {
            bloodPressureChart.destroy();
          }
          bloodPressureChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Systolic BP",
                  data: systolic,
                  borderColor: "rgba(255, 99, 132, 1)",
                  fill: false,
                },
                {
                  label: "Diastolic BP",
                  data: diastolic,
                  borderColor: "rgba(54, 162, 235, 1)",
                  fill: false,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Blood Pressure (mmHg)",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
              },
            },
          });
          if (patient.diagnostic_list && patient.diagnostic_list.length > 0) {
            patient.diagnostic_list.forEach((diagnosis) => {
              const listItem = document.createElement("li");
              listItem.innerHTML = `
                  <div>
                  <p> ${diagnosis.name}</p>
                  </div>
                  <div>
                  <p>${diagnosis.description}  </p>
                  </div>
                  <div>
                  <p>${diagnosis.status}</p>
                  </div>
                    
                  `;
              detailsHolder.appendChild(listItem);
            });
          } else {
            const noDataItem = document.createElement("li");
            noDataItem.textContent = "No diagnostic data available.";
            detailsHolder.appendChild(noDataItem);
          }
          if (patient.lab_results && patient.lab_results.length > 0) {
            patient.lab_results.forEach((result) => {
              const resultDiv = document.createElement("div");
              resultDiv.className = "lastholder--labresults__holderdetails";
              resultDiv.innerHTML = `
                    <ul>
                      <li>${result}</li>
                      <img src="./images/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="downloadicon">
                    </ul>
                  `;
              labResultsHolder.appendChild(resultDiv);
            });
          } else {
            const noLabResultsItem = document.createElement("div");
            noLabResultsItem.textContent = "No lab results available.";
            labResultsHolder.appendChild(noLabResultsItem);
          }
        });
        patientHolder.appendChild(patientDiv);
      });
    } catch (error) {
      console.error("No data due to error", error);
    }
  }
  FetchData();
});
