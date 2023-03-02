import {Button, Form, Input, InputNumber, Upload,Modal, Space, Table, Radio, RadioChangeEvent} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import { ENP_URL } from '../../../urls'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table'
import { CATEGORY, employeedata, JOBTITLE, PAYGROUP, UNITS } from '../../../../../data/DummyData'

const RecruitmentSelection = () => {
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

  const [employeeRecord, setEmployeeRecord]= useState<any>(null)
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
  const showShortModal = (record:any) => {
    setIsShortModalOpen(true)
    setEmployeeRecord({...record})
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

  const columns:any = [
   
    // {
    //   title: 'Employee ID',
    //   dataIndex: 'empcode',
    //   sorter: (a: any, b: any) => {
    //     if (a.empcode > b.empcode) {
    //       return 1
    //     }
    //     if (b.empcode > a.empcode) {
    //       return -1
    //     }
    //     return 0
    //   },
    // },
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
      title: 'Score',
      dataIndex: 'score',
      sorter: (a: any, b: any) => {
        if (a.score > b.score) {
          return 1
        }
        if (b.score > a.score) {
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
          <a href='#' onClick={()=>{showShortModal(record)}} className=' btn btn-light-info btn-sm'>
            Shortlist
          </a>
          <a href='#'  className='btn btn-light-primary btn-sm'>
            Selection
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

      <div style={{padding: "0px 0px 0px 0px"}}  className='col-12 row'>
        <div style={{padding: "20px 20px 0 20px"}} className='col-6 row mb-0'>
          <div className='col-6 mb-7'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">Reference#</label>
            <input type="text" name="ref" className="form-control form-control-solid" />
          </div>

          <div className='col-6 mb-7'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">Description</label>
            <input type="textarea" name="desc" className="form-control form-control-solid" />
          </div>
        </div>
        <div style={{padding: "20px 0px 0 0px"}} className='col-6 row mb-0'>
          <div className='col-6 mb-3'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">Start date</label>
            <input type="date" name="sdate" className="form-control form-control-solid" />
          </div>

          <div className='col-6 mb-7'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">End date</label>
            <input type="date" name="edate" className="form-control form-control-solid" />
          </div>
        </div>
        <div style={{padding: "20px 20px 0 20px"}} className='col-6 row mb-0'>
          <div className='col-6 mb-7'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">Paygroup</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option> select</option>
              {PAYGROUP.map((item: any) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='col-6 mb-7'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">Category</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option> select</option>
              {CATEGORY.map((item: any) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{padding: "20px 0px 0 0px"}} className='col-6 row mb-0'>
          <div className='col-6 mb-7'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">Job Title</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option> select</option>
              
              {JOBTITLE.map((item: any) => (
                <option value={item.code}>{item.desc}</option>
              ))}
            </select>
          </div>
          <div className='col-6 mb-7'>
            <label htmlFor="exampleFormControlInput1" className=" form-label">Unit</label>
            <select className="form-select form-select-solid" aria-label="Select example">
              <option> select</option>
              {UNITS.map((item: any) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <KTCardBody className='py-4 '>
        <div className='table-responsive'>
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
          <Table columns={columns} rowKey={(record)=>record.code} dataSource={employeedata} />
          {/* Add form */}
          <Modal
                title='New Applicant'
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
                      <label htmlFor="exampleFormControlInput1" className="required form-label">First Name</label>
                      <input type="text" name="code"  className="form-control form-control-solid"/>
                    </div>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">Last Name</label>
                      <input type="text" name="name"  className="form-control form-control-solid"/>
                    </div>
                  </div>
                  <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">DOB</label>
                      <input type="date" name="code"  className="form-control form-control-solid"/>
                    </div>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">Gender</label>
                      <input type="phone" name="name"  className="form-control form-control-solid"/>
                    </div>
                  </div>
                  <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">Phone Number</label>
                      <input type="text" name="code"  className="form-control form-control-solid"/>
                    </div>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">Email</label>
                      <input type="email" name="name"  className="form-control form-control-solid"/>
                    </div>
                  </div>
                  <div style={{padding: "20px 20px 0 20px"}} className='row mb-7 '>
                    <div className='col-6 mb-3'>
                      <label htmlFor="exampleFormControlInput1" className="required form-label">Qualification</label>
                      <input type="text" name="code"  className="form-control form-control-solid"/>
                    </div>
                    <div className='col-6 mb-3' style={{padding: "30px 20px 0 20px"}}>  
                    <Upload
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                      className="upload-list-inline"
                    
                    >                  
                      {/* <a href='#' className='form-control btn btn-light-primary btn-sm'>
                        Upload document
                      </a> */}
                      <Button style={{padding: "10px 20px 30px 20px"}}  className='form-control btn btn-light-primary btn-sm' icon={<UploadOutlined />}>Upload</Button>
                     
                      </Upload>
                    </div>
                  </div>
                </Form>
          </Modal>

           {/* shortlist form */}
          <Modal
                title='Short List'
                open={isShortModalOpen}
                onCancel={handleShortCancel}
                closable={true}
                width="900px"
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
                  {/* <hr></hr> */}
                <hr></hr>
                <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">First Name</label>
                    <input type="text" name="code" value={employeeRecord?.firstname} className="form-control form-control-solid"/>
                  </div>
                  <div className='col-6 mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Last Name</label>
                    <input type="text" name="name" value={employeeRecord?.lastname} className="form-control form-control-solid"/>
                  </div>
                </div>
                <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">DOB</label>
                    <input type="text" name="code" value={employeeRecord?.dob}  className="form-control form-control-solid"/>
                  </div>
                  <div className='col-6 mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Gender</label>
                    <input type="text" name="name" value={employeeRecord?.sex} className="form-control form-control-solid"/>
                  </div>
                </div>
                <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Phone Number</label>
                    <input type="phone" name="code" value={employeeRecord?.phone}  className="form-control form-control-solid"/>
                  </div>
                  <div className='col-6 mb-3'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Email</label>
                    <input type="email" name="name"  className="form-control form-control-solid"/>
                  </div>
                </div>
                <hr></hr>
                <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-3'>
                  <label style={{padding: "0px 30px 0 0px"}} htmlFor="exampleFormControlInput1" className=" form-label">Qualification</label>
                    <Radio.Group onChange={onRadioChange} value={radioValue}>
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </Radio.Group>
                    <textarea style={{margin: "10px 0px 0 0px"}} className="form-control form-control-solid" placeholder='comments on qualification (optional)' aria-label="With textarea"></textarea>
                  </div>
                  <div className='col-6 mb-3'>
                    <label style={{padding: "0px 40px 0 0px"}} htmlFor="exampleFormControlInput1" className=" form-label">Work Skills</label>
                    <Radio.Group onChange={onRadio1Change} value={radio1Value}>
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </Radio.Group>
                    <textarea style={{margin: "10px 0px 0 0px"}} className="form-control form-control-solid" placeholder='comments on work skills (optional)' aria-label="With textarea"></textarea>
                  </div>
                </div>
                <div style={{padding: "20px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-3'>
                  <label style={{padding: "0px 36px 0 0px"}} htmlFor="exampleFormControlInput1" className=" form-label">Experiences </label>
                    <Radio.Group onChange={onRadio2Change} value={radio2Value}>
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </Radio.Group>
                    <br></br>
                    <textarea style={{margin: "10px 0px 0 0px"}} className="form-control form-control-solid" placeholder='comments on experiences (optional)' aria-label="With textarea"></textarea>
                  </div>
                  <div className='col-6 mb-3'>
                  <label style={{padding: "0px 48px 0 0px"}} htmlFor="exampleFormControlInput1" className=" form-label">Reference</label>
                    <Radio.Group onChange={onRadio3Change} value={radio3Value}>
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </Radio.Group>
                    <textarea style={{margin: "10px 0px 0 0px"}} className="form-control form-control-solid" placeholder='comments on reference (optional)' aria-label="With textarea"></textarea>
                  </div>
                </div>
                <div style={{padding: "20px 20px 0 20px"}} className='row mb-7 '>
                  <div className='col-6 mb-3'>
                    <label style={{padding: "0px 39px 0 0px"}} htmlFor="exampleFormControlInput1" className=" form-label">Social Skills</label>
                    <Radio.Group onChange={onRadio4Change} value={radio4Value}>
                      <Radio value={1}>1</Radio>
                      <Radio value={2}>2</Radio>
                      <Radio value={3}>3</Radio>
                      <Radio value={4}>4</Radio>
                      <Radio value={5}>5</Radio>
                    </Radio.Group>
                   
                    <textarea style={{margin: "10px 0px 0 0px"}} className="form-control form-control-solid" placeholder='comments on social skills (optional)' aria-label="With textarea"></textarea>
                  </div>
                 
                </div>
              </Form>
          </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {RecruitmentSelection}
