
import {Button, Form, Input, InputNumber, Upload,Modal, Space, Table, Radio, RadioChangeEvent} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import { ENP_URL } from '../../../urls'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table'
import { employeedata } from '../../../../../data/DummyData'

const TrainingDevelopment = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShortModalOpen, setIsShortModalOpen] = useState(false)
  const [radioValue, setRadioValue] = useState();
  const [radio1Value, setRadio1Value] = useState();
  const [radio2Value, setRadio2Value] = useState();
  const [radio3Value, setRadio3Value] = useState();
  const [radio4Value, setRadio4Value] = useState();
  const [employeeRecord, setEmployeeRecord]= useState<any>([])
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }
  const showShortModal = () => {
    setIsShortModalOpen(true)
  }

  const handleShortOk = () => {
    setIsShortModalOpen(false)
  }

  const handleShortCancel = () => {
    form.resetFields()
    setIsShortModalOpen(false)
  }

  const deleteData = async (element: any) => {
    try {
      const response = await axios.delete(`${ENP_URL}/ProductionActivity/${element.id}`)
      // update the local state so that react can refecth and re-render the table with the new data
      const newData = gridData.filter((item: any) => item.id !== element.id)
      setGridData(newData)
      return response.status
    } catch (e) {
      return e
    }
  }
  const [fileList, setFileList] = useState<UploadFile[]>([
    
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  // to preview the uploaded file
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  const onRadio1Change = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadio1Value(e.target.value);
  };
  const onRadio2Change = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadio2Value(e.target.value);
  };
  const onRadio3Change = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadio3Value(e.target.value);
  };
  const onRadio4Change = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadio4Value(e.target.value);
  };

  function handleDelete(element: any) {
    deleteData(element)
  }

  const columns: any = [
   
    {
      title: 'Employee ID',
      dataIndex: 'empcode',
      sorter: (a: any, b: any) => {
        if (a.empcode > b.empcode) {
          return 1
        }
        if (b.empcode > a.empcode) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      sorter: (a: any, b: any) => {
        if (a.firstname > b.firstname) {
          return 1
        }
        if (b.firstname > a.firstname) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      sorter: (a: any, b: any) => {
        if (a.lastname > b.lastname) {
          return 1
        }
        if (b.lastname > a.lastname) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      sorter: (a: any, b: any) => {
        if (a.dob > b.dob) {
          return 1
        }
        if (b.dob > a.dob) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      sorter: (a: any, b: any) => {
        if (a.sex > b.sex) {
          return 1
        }
        if (b.sex > a.sex) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      sorter: (a: any, b: any) => {
        if (a.phone > b.phone) {
          return 1
        }
        if (b.phone > a.phone) {
          return -1
        }
        return 0
      },
    },
    // {
    //   title: 'Unit',
    //   dataIndex: 'unit',
    //   sorter: (a: any, b: any) => {
    //     if (a.name > b.name) {
    //       return 1
    //     }
    //     if (b.name > a.name) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },

    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <a href='#' onClick={showShortModal} className='btn btn-light-primary btn-sm'>
            Shortlist
          </a> */}
          <a  className='btn btn-light-primary btn-sm'>
            Remove
          </a>
         
        </Space>
      ),
      
    },
  ]
  const columnSchedules: any = [
   
    
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a: any, b: any) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Day',
      dataIndex: 'date',
      sorter: (a: any, b: any) => {
        if (a.date > b.date) {
          return 1
        }
        if (b.date > a.date) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      sorter: (a: any, b: any) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      },
    },

    {
      title: 'Action',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <a href='#' onClick={showShortModal} className='btn btn-light-primary btn-sm'>
            Shortlist
          </a> */}
          <a  className='btn btn-light-primary btn-sm'>
            delete
          </a>
         
        </Space>
      ),
      
    },
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ENP_URL}/ProductionActivity`)
      setGridData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  const  data = [

    {
      key:'1',
      id:'1',
      date:"Day 1 - Morning", 
      phone:"0249920482",
    
      topic: "Sage Installation",
    },
    {
      key:'2',
      id:'2',
      date:"Day 2 - Morning",
      topic: "DevOps",

    },
    {
      key:'3',
      id:'3',
      date:"Day 3 - Morning", 
      topic: "MySQL Basics",

    }
  ];


  const onEmployeeChange = (e: any) => {
    const objectId = e.target.value 
    const newEmplo = employeedata.find((item:any)=>{
      return item.code.toString()===objectId
    })
  setEmployeeRecord(newEmplo)
    
  }

  useEffect(() => {
    loadData()
  }, [])

  const dataWithIndex = gridData.map((item: any, index) => ({
    ...item,
    key: index,
  }))

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value)
    if (e.target.value === '') {
      loadData()
    }
  }

  const globalSearch = () => {
    // @ts-ignore
    filteredData = dataWithVehicleNum.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchText.toLowerCase())
      )
    })
    setGridData(filteredData)
  }

  const url = `${ENP_URL}/ProductionActivity`
  const onFinish = async (values: any) => {
    setSubmitLoading(true)
    const data = {
      name: values.name,
    }

    console.log(data)

    try {
      const response = await axios.post(url, data)
      setSubmitLoading(false)
      form.resetFields()
      setIsModalOpen(false)
      loadData()
      return response.statusText
    } catch (error: any) {
      setSubmitLoading(false)
      return error.statusText
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >

      {/* Top part of the page */}

      <div style={{padding: "0px 0px 0px 0px"}} className='col-12 row'>
        <div style={{padding: "0px 0px 0px 20px"}}  className='col-6'>
          <div style={{padding: "20px 0px 0 0px"}} className='col-12 row mb-0'>
            <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className=" form-label">Reference#</label>
              <input type="text" name="ref" className="form-control form-control-solid" />
            </div>

            <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className=" form-label">Training Type</label>
              <select className="form-select form-select-solid" aria-label="Select example">
                <option> select</option>
                <option value="1">IN-HOUSE </option>
                <option value="2">PROFESSIONAL DEVELOPMENT </option>
                <option value="3">EXTERNAL </option>
                <option value="4">CERTIFICATION</option>
              </select>
            </div>
          </div>
          <div style={{padding: "20px 0px 0 0px"}} className='col-12 row mb-0'>
            <div className='col-6 mb-3'>
              <label htmlFor="exampleFormControlInput1" className=" form-label">Start date</label>
              <input type="date" name="sdate" className="form-control form-control-solid" />
            </div>

            <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className=" form-label">End date</label>
              <input type="date" name="edate" className="form-control form-control-solid" />
            </div>
          </div>
          <div style={{padding: "20px 0px 0 0px"}} className='col-12 row mb-0'>
            <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className=" form-label">Facilitator</label>
              <input type="text" name="fac" className="form-control form-control-solid" />

            </div>
            <div className='col-6 mb-7'>
              <label htmlFor="exampleFormControlInput1" className=" form-label">Venue</label>
              <input type="text" name="venue" className="form-control form-control-solid" />

              
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 16}}>
            <h3><b>Training Schedule Table</b></h3>
            </Space>
            <Space style={{marginBottom: 16}}>
              <button type='button' className='btn btn-primary me-3' onClick={showShortModal}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Add
              </button>
            </Space>
          </div>
          <Table columns={columnSchedules} dataSource={data} />
        </div>
      </div>
      <hr></hr>
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
            <br></br>
          <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 16}}>
              <Input
                placeholder='Enter Search Text'
                onChange={handleInputChange}
                type='text'
                allowClear
                value={searchText}
              />
              <Button type='primary' onClick={globalSearch}>
                Search
              </Button>
            </Space>
            <Space style={{marginBottom: 16}}>
              <button type='button' className='btn btn-primary me-3' onClick={showModal}>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                Add
              </button>

              <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
                Export
            </button>
            </Space>
          </div>
          <Table columns={columns} dataSource={employeedata} />
          {/* Add form */}
          <Modal
                title='Employee Details'
                open={isModalOpen}
                onCancel={handleCancel}
                closable={true}
                width="900px"
                footer={[
                  <Button key='back' onClick={handleCancel}>
                      Cancel
                  </Button>,
                  <Button
                  key='submit'
                  type='primary'
                  htmlType='submit'
                  loading={submitLoading}
                  onClick={() => {
                    form.submit()
                  }}
                  >
                      Submit
                  </Button>,
                ]}
            >
                <Form
                    labelCol={{span: 7}}
                    wrapperCol={{span: 14}}
                    layout='horizontal'
                    form={form}
                    name='control-hooks'
                    onFinish={onFinish}
                >
                    <hr></hr>
                    <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="form-label">Employee ID</label>
                      <select className="form-select form-select-solid" aria-label="Select example" onChange={(e)=>onEmployeeChange(e)}>
                       <option>select</option>
                        {employeedata.map((item: any) => (
                          <option value={item.code}> {item.empcode} - {item.lastname}</option>
                        ))}
                      </select>
                    </div>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="form-label">Job Title</label>
                      <input type="text" name="code" value={employeeRecord?.jobt} className="form-control form-control-solid"/>
                    </div>
                  </div>
                  <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                      <input type="text" name="fname" value={employeeRecord?.firstname} className="form-control form-control-solid"/>
                    </div>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">Last Name</label>
                      <input type="text" name="lname" value={employeeRecord?.lastname} className="form-control form-control-solid"/>
                    </div>
                  </div>
                  <div style={{padding: "20px 20px 10px 20px"}} className='row mb-7 '>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="form-label">DOB</label>
                      <input type="text" name="code" value={employeeRecord?.dob} className="form-control form-control-solid"/>
                    </div>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">Gender</label>
                      <input type="text" name="code" value={employeeRecord?.sex} className="form-control form-control-solid"/>
                    </div>
                  </div>
                  
                </Form>
          </Modal>


          {/* Modal for the  */}

          <Modal
                title='Training Schedule'
                open={isShortModalOpen}
                onCancel={handleShortCancel}
                closable={true}
                width="600px"
                footer={[
                  <Button key='back' onClick={handleShortCancel}>
                      Cancel
                  </Button>,
                  <Button
                  key='submit'
                  type='primary'
                  htmlType='submit'
                  loading={submitLoading}
                  onClick={() => {
                    form.submit()
                  }}
                  >
                      Submit
                  </Button>,
                ]}
            >
                <Form
                    labelCol={{span: 7}}
                    wrapperCol={{span: 14}}
                    layout='horizontal'
                    form={form}
                    name='control-hooks'
                    onFinish={onFinish}
                >
                    <hr></hr>
                    
                  <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="form-label">Topic</label>
                      <input type="text" name="topic"  className="form-control form-control-solid"/>
                    </div>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className=" form-label">Day</label>
                      <input type="text" name="trainDate"  className="form-control form-control-solid"/>
                    </div>
                  </div>
                </Form>
          </Modal>

          
        </div>
      </KTCardBody>
    </div>
  )
}

export {TrainingDevelopment}


