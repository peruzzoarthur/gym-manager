// import { RegisteredDoublesTable } from '@/components/custom/eventsTable/columns'
// import { ScheduleTableProps } from '@/components/custom/scheduleTable/columns'
// import xlsx, { IJsonSheet } from 'json-as-xlsx'

// export function downloadScheduleToExcel(schedule: ScheduleTableProps[]) {
//     const columns: IJsonSheet[] = [
//         {
//             sheet: 'Schedule',
//             columns: [
//                 { label: '#', value: 'number' },
//                 { label: 'Date & Time', value: 'start' },
//                 { label: 'Court', value: 'court' },
//                 { label: 'Doubles 1', value: 'doublesOne' },
//                 { label: 'Doubles 2', value: 'doublesTwo' },
//             ],
//             content: schedule,
//         },
//     ]

//     const settings = {
//         fileName: 'Matches_Schedule_Excel',
//     }

//     xlsx(columns, settings)
// }

// export function downloadRegisteredDoublesToExcel(
//     schedule: RegisteredDoublesTable[]
// ) {
//     const columns: IJsonSheet[] = [
//         {
//             sheet: 'Schedule',
//             columns: [
//                 { label: 'Player One', value: 'playerOneName' },
//                 { label: 'Player Two', value: 'playerTwoName' },
//                 { label: 'Matches won', value: 'matchesWon' },
//                 { label: 'Games won', value: 'W' },
//                 { label: 'Total games played', value: 'T' },
//                 { label: 'Level', value: 'categoryLevel' },
//                 { label: 'Category Type', value: 'categoryType' },
//             ],
//             content: schedule,
//         },
//     ]

//     const settings = {
//         fileName: 'Registered_Doubles_Excel',
//     }

//     xlsx(columns, settings)
// }
