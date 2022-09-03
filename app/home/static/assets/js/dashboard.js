$.ajax({
    url: '/initial-dashboard-data',
    type: 'GET',
    success: (response) => {
        console.log(response);
        setPatientCard(response.moderate_patients, 'moderate');
        setPatientCard(response.serius_patients, 'serius');
        setPatientCard(response.critical_patients, 'critical');
        
    },
});

function setPatientCard(data, typeOfPatient){
    var label = document.getElementById(`${typeOfPatient}-label`);
    label.innerHTML = data.label;
    removeSkeletonClasses(label);

    var dropdownContainer = document.getElementById(`${typeOfPatient}-dropdown-container`);
    var dropdownLabel = document.getElementById(`${typeOfPatient}-dropdown-label`);
    var moderateDropdownFilters = document.getElementById(`${typeOfPatient}-dropdown-filters`);
    dropdownLabel.innerHTML = data.date;
    moderateDropdownFilters.classList.remove('d-none');
    removeSkeletonClasses(dropdownContainer);
    
    var statusContainer = document.getElementById(`${typeOfPatient}-status-container`);
    var status = document.getElementById(`${typeOfPatient}-status`);
    status.innerHTML = data.weekly_ranking.total;
    removeSkeletonClasses(statusContainer);

    var percentageContainer = document.getElementById(`${typeOfPatient}-percentage-container`);
    var percentage = data.weekly_ranking.percentage;
    var percentageLabel = data.weekly_ranking.percentage_label;
    setPatientPercentage(typeOfPatient, percentage, percentageLabel);
    removeSkeletonClasses(percentageContainer);

}

function setPatientPercentage(typeOfPatient, percentage, percentageLabel) {
    var percentageStatus = document.getElementById(`${typeOfPatient}-percentage`);
    if (percentage >= 0) {
        percentageStatus.innerHTML = `+${percentage}%`;
        percentageStatus.classList.add('text-danger');
    } else {
        percentageStatus.innerHTML = `${percentage}%`;
        percentageStatus.classList.add('text-success');
    }

    percentageStatus.innerHTML += `<span class="font-weight-normal opacity-8 text-dark" id="moderate-percentage-label"> ${percentageLabel}</span>`;
}

let skeletonClasses = [
    'skeleton',
    'skeleton-text',
    'skeleton-chart',
    'skeleton-table',
    'skeleton-body',
    'skeleton-w-10',
    'skeleton-w-20',
    'skeleton-w-30',
    'skeleton-w-40',
    'skeleton-w-50',
    'skeleton-w-60',
    'skeleton-w-70',
    'skeleton-w-90',
    'skeleton-w-90',
    'skeleton-w-100',
];

function removeSkeletonClasses(element){
    element.classList.remove(...skeletonClasses)
}

moderatePatientColor = '#10739E';
seriusPatientColor = '#CF8913';
criticalPatientColor = '#9D443D';

patientsStatus = [
    'moderate-status',
    'serius-status',
    'critical-status',
    'total-status',
    'donut-moderate-status',
    'donut-serius-status',
    'donut-critical-status',
    'line-total-status',
];

// patientsStatus.forEach((patientStatus) => {
//     var element = document.getElementById(patientStatus);
//     element.setAttribute('countTo', 40);
//     if (element) {
//         const countUp = new CountUp(
//             patientStatus,
//             element.getAttribute('countTo')
//         );
//         if (!countUp.error) {
//             countUp.start();
//         } else {
//             console.error(countUp.error);
//         }
//     }
// });

// Chart Doughnut Total patients classified
var ctx1 = document.getElementById('chart-total-patients').getContext('2d');

var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke1.addColorStop(1, 'rgba(16, 115, 158,0.2)');
gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke1.addColorStop(0, 'rgba(16, 115, 158,0)');

// new Chart(ctx1, {
//     type: 'doughnut',
//     data: {
//         labels: ['Moderados', 'Graves', 'Críticos'],
//         datasets: [
//             {
//                 label: 'Paciente',
//                 weight: 9,
//                 cutout: 90,
//                 tension: 0.9,
//                 pointRadius: 2,
//                 borderWidth: 2,
//                 backgroundColor: [
//                     moderatePatientColor,
//                     seriusPatientColor,
//                     criticalPatientColor,
//                 ],
//                 data: [140, 60, 18],
//                 fill: false,
//             },
//         ],
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//         },
//         interaction: {
//             intersect: false,
//             mode: 'index',
//         },
//         scales: {
//             y: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//             },
//             x: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//             },
//         },
//     },
// });

// Chart bar Patients by week
var ctx2 = document.getElementById('chart-week-patients').getContext('2d');

// new Chart(ctx2, {
//     type: 'bar',
//     data: {
//         labels: ['18', '19', '20', '21', '22', '23', '24'],
//         datasets: [
//             {
//                 label: 'Pacientes moderados',
//                 tension: 1,
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 backgroundColor: moderatePatientColor,
//                 data: [10, 10, 5, 7, 5, 5, 5],
//                 maxBarThickness: 20,
//             },
//             {
//                 label: 'Pacientes graves',
//                 tension: 1,
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 backgroundColor: seriusPatientColor,
//                 data: [3, 3, 3, 5, 3, 3, 3],
//                 maxBarThickness: 20,
//             },
//             {
//                 label: 'Pacientes críticos',
//                 tension: 1,
//                 borderWidth: 0,
//                 borderRadius: 5,
//                 backgroundColor: criticalPatientColor,
//                 data: [2, 3, 3, 3, 3, 3, 3],
//                 maxBarThickness: 20,
//             },
//         ],
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//         },
//         scales: {
//             y: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//                 stacked: true,
//             },
//             x: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     beginAtZero: true,
//                     font: {
//                         size: 12,
//                         family: 'Open Sans',
//                         style: 'normal',
//                     },
//                     color: '#9ca2b7',
//                 },
//                 stacked: true,
//             },
//         },
//     },
// });

// Chart line Patients by datepicker
if (document.querySelector('.datepicker')) {
    flatpickr('.datepicker', {
        mode: 'range',
        locale: 'es',
        // defaultDate: "2022-01-01 to 2022-07-24"
    });
}

var ctx3 = document.getElementById('chart-patients-line').getContext('2d');
var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke1.addColorStop(1, 'rgba(23, 194, 232, 0.2)');
gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke1.addColorStop(0, 'rgba(23, 194, 232,0)');

var gradientStroke2 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke2.addColorStop(1, 'rgba(58, 65, 111,0.2)');
gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke2.addColorStop(0, 'rgba(58, 65, 111,0)');

var gradientStroke3 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke3.addColorStop(1, 'rgba(203, 12, 159,0.2)');
gradientStroke3.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke3.addColorStop(0, 'rgba(203, 12, 159,0)');

// new Chart(ctx3, {
//     type: 'line',
//     data: {
//         labels: [
//             'Enero',
//             'Febrero',
//             'Marzo',
//             'Abril',
//             'Mayo',
//             'Junio',
//             'Julio',
//         ],
//         datasets: [
//             {
//                 label: 'Pacientes moderados',
//                 tension: 0.4,
//                 borderWidth: 0,
//                 pointRadius: 2,
//                 pointBackgroundColor: moderatePatientColor,
//                 borderColor: moderatePatientColor,
//                 borderWidth: 3,
//                 backgroundColor: gradientStroke1,
//                 fill: true,
//                 data: [50, 40, 300, 220, 500, 250, 400],
//                 maxBarThickness: 6,
//             },
//             {
//                 label: 'Pacientes graves',
//                 tension: 0.4,
//                 borderWidth: 0,
//                 pointRadius: 2,
//                 pointBackgroundColor: seriusPatientColor,
//                 borderColor: seriusPatientColor,
//                 borderWidth: 3,
//                 backgroundColor: gradientStroke2,
//                 fill: true,
//                 data: [30, 90, 40, 140, 290, 290, 340],
//                 maxBarThickness: 6,
//             },
//             {
//                 label: 'Pacientes críticos',
//                 tension: 0.4,
//                 borderWidth: 0,
//                 pointRadius: 2,
//                 pointBackgroundColor: criticalPatientColor,
//                 borderColor: criticalPatientColor,
//                 borderWidth: 3,
//                 backgroundColor: gradientStroke3,
//                 fill: true,
//                 data: [40, 80, 70, 90, 30, 90, 140],
//                 maxBarThickness: 6,
//             },
//         ],
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//         },
//         interaction: {
//             intersect: false,
//             mode: 'index',
//         },
//         scales: {
//             y: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//             },
//             x: {
//                 grid: {
//                     drawBorder: false,
//                     display: false,
//                     drawOnChartArea: false,
//                     drawTicks: false,
//                 },
//                 ticks: {
//                     beginAtZero: true,
//                     font: {
//                         size: 12,
//                         family: 'Open Sans',
//                         style: 'normal',
//                     },
//                     color: '#9ca2b7',
//                 },
//             },
//         },
//     },
// });

// Datatable of patients resume
const dataTableBasic = new simpleDatatables.DataTable('#datatable-patients', {
    searchable: true,
    fixedHeight: true,
    lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'Todos'],
    ],
});
