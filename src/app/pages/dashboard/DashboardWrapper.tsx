/* eslint-disable jsx-a11y/anchor-is-valid */
import  {FC, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {
    MixedWidget10,
    MixedWidget11,
    MixedWidget2, MixedWidget3,
} from '../../../_metronic/partials/widgets'
import { useNavigate} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {ENP_URL} from "../../modules/production/urls";
import {KTCard, KTCardBody,  } from "../../../_metronic/helpers";
import { message } from "antd";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import {
    Agenda,
    Day,
    DragAndDrop,
    Inject,
    Month,
    Resize,
    ScheduleComponent,
    Week,
    WorkWeek
} from "@syncfusion/ej2-react-schedule";
import {fetchEmployees, fetchLeaveTypes, fetchUnits} from "../../services/ApiCalls";
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import {L10n} from "@syncfusion/ej2-base";
L10n.load({
    'en-US': {
        schedule: {
            saveButton: 'Request Leave',
            cancelButton: 'Cancel',
            deleteButton: 'Remove',
            newEvent: 'Request Leave',
        },
    },
})
const EmployeeLeavePlanning = () => {
    let dropDownListObj: any
    const [chosenLocationIdFromDropdown, setChosenLocationIdFromDropdown] = useState(null)
    const navigate = useNavigate()
    const {data: locations} = useQuery('Locations', () => axios.get(`${ENP_URL}/IclocsApi`), {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })
    //set the data to dataSource property
    // const [serviceTypeDropDownValues, setserviceTypeDropDownValues] = useState([])
    let scheduleObj
    // React Query
    //Get
    const {data: employeeData} = useQuery('employeeData', fetchEmployees, {
        refetchOnWindowFocus: false,
        staleTime: 300000,
    })

    const {data: leaveTypes} = useQuery('leaveTypes', fetchLeaveTypes, {
        refetchOnWindowFocus: false,
        staleTime: 300000,
    })

    //Access the same location query from cycle details component
    console.log('employeeData', employeeData)

    // let dropDownListObject;

    const employeesQueryData = useQueryClient()

    console.log('employeesQueryData', employeesQueryData)
    function editorTemplate(props:any) {
        console.log('props', props)
        // if (props.serviceTypeId) {
        //   const fleetModel = vmQuery.getQueryData('vmequps')?.data?.find((fleet) => fleet.fleetID.trimEnd() === props.fleetId.trimEnd())?.modlName
        //   // const serviceTypesOfSelectedModel = serviceTypes?.data?.filter((service) => service.model.trimEnd() === fleetModel.trimEnd())
        //
        //   // Setting Service Type dropdown values
        //   // dropDownListObject.dataSource = serviceTypesOfSelectedModel.map((service) => {
        //   //   return { text: service.name, value: service.id }
        //   // })
        //   // dropDownListObject.dataBind() // refresh the dropdown list
        // }
        {/*function getEmployeeUnit(e) {*/}
        //     console.log("e", e)
        //     if (e.itemData) {
        //         console.log("e.itemData", e.itemData)
        //         // udpate location dropdown component to automatically select the selected employee unit
        //         // console.log("employeeDatay", employeesQueryData.)
        //         const employeeDepartId = employeesQueryData.getQueryData('employeeData')?.data?.find((employee) => employee.id === e.itemData.value).departmentId
        //         const unitInputField = document.getElementById("Location")
        //         console.log("unitInputField", unitInputField)
        //         //get the unit of the selected employee
        //
        //         if (employeeDepartId === null || employeeDepartId === undefined) {
        //             message.error("Employee does not have a department").then(r => r)
        //         }
        //         else {
        //             unitInputField.value = unitQuery.data?.data?.find((unit) => unit.departmentId === employeeDepartId).name
        //             console.log("unitInputField", unitInputField)
        //         }
        //         // console.log("employeeDepartId", employeeDepartId)
        //     }
        // }
        return props !== undefined ? (
            <table className='custom-event-editor' style={{width: '100%'}} cellPadding={5}>
                <tbody>
                <tr>
                    <td className='e-textlabel'>Type of Leave</td>
                    <td colSpan={4}>
                        <DropDownListComponent
                            id='serviceTypeId'
                            placeholder='Choose Type of Leave'
                            data-name='serviceTypeId'
                            className='e-field'
                            // ref={(scope) => (dropDownListObject = scope)}
                            style={{width: '100%'}}
                            dataSource={leaveTypes?.data?.map((leaveType:any) => {
                                return {
                                    text: `${leaveType.name}`,
                                    value: `${leaveType.code}`
                                }
                            })}
                            fields={{text: 'text', value: 'value'}}
                            value={props?.serviceTypeId}
                        />
                    </td>
                </tr>
                <tr>
                    <td className='e-textlabel'>From</td>
                    <td colSpan={4}>
                        <DateTimePickerComponent
                            id='StartTime'
                            format='dd/MM/yy hh:mm a'
                            data-name='timeStart'
                            value={props && props.timeStart ? new Date(props?.timeStart) : props?.StartTime}
                            className='e-field'
                        ></DateTimePickerComponent>
                    </td>
                </tr>
                <tr>
                    <td className='e-textlabel'>To</td>
                    <td colSpan={4}>
                        <DateTimePickerComponent
                            id='EndTime'
                            format='dd/MM/yy hh:mm a'
                            data-name='timeEnd'
                            value={props && props.timeEnd ? new Date(props?.timeEnd) : props?.EndTime}
                            className='e-field'
                        ></DateTimePickerComponent>
                    </td>
                </tr>
                </tbody>
            </table>
        ) : (
            message.error('Please select an event')
        )
    }
    console.log('chosenLocationIdFromDropdown', chosenLocationIdFromDropdown)
    return (
        <>
            <KTCard>
                <KTCardBody className='py-5 px-2'>
                    <div className='schedule-control-section'>
                        <div className='col-lg-12 control-section'>
                            <div className='control-wrapper'>

                                <ScheduleComponent
                                    width='100%'
                                    height='650px'
                                    ref={t => scheduleObj = t}
                                    // eventSettings={{ dataSource: data }}
                                    // eventRendered={onEventRendered.bind(this)}
                                    currentView='Month'
                                    id='schedule'
                                    editorTemplate={editorTemplate}
                                >
                                    <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                                </ScheduleComponent>
                            </div>
                        </div>
                    </div>
                </KTCardBody>
            </KTCard>
        </>
    )
}
const DashboardPage: FC = () => (




  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
     <div className='col-xxl-6'>
        <MixedWidget3
          className='card-xl-stretch mb-xl-8'
          chartColor='danger'
          chartHeight='200px'
        />
      </div>
      {/* <div className='col-xxl-4'>
        <ListsWidget5 className='card-xxl-stretch' />
      </div> */}
      {/*<div className='col-xxl-6'>*/}
         {/*<ListsWidget5 className='card-xxl-stretch' />*/}
        {/*<CanvasJSChart options = {options}/>  */}
        {/* <TestChart*/}
        {/*  className='card-xxl-stretch-50 mb-5 mb-xl-8'*/}
        {/*  chartColor='primary'*/}
        {/*  chartHeight='175px'*/}
        {/*/>  */}
      {/*  <MixedWidget11*/}
      {/*    className='card-xxl-stretch-50 mb-5 mb-xl-8'*/}
      {/*    chartColor='primary'*/}
      {/*    chartHeight='175px'*/}
      {/*  />*/}
      {/*</div>*/}
 <div className='col-6'>
        <MixedWidget10
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='150px'
        />
        <MixedWidget11
          className='card-xxl-stretch-50 mb-5 mb-xl-8'
          chartColor='primary'
          chartHeight='175px'
        />
      </div>
        <div className={'col-12'}>
            <EmployeeLeavePlanning />
        </div>
    </div>
    {/* end::Row */}
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>Employee Portal</PageTitle>
      <DashboardPage />

    </>
  )
}

export {DashboardWrapper}
