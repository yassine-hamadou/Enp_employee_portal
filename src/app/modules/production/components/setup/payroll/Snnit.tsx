import {Button, Form, Input, InputNumber, Modal, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import { ENP_URL } from '../../../urls'

const SNNIT = () => {
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  let [filteredData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)

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

  

  function handleDelete(element: any) {
    deleteData(element)
  }
  const columns: any = [
   
    {
      title: 'Code',
      dataIndex: 'code',
      sorter: (a: any, b: any) => {
        if (a.code > b.code) {
          return 1
        }
        if (b.code > a.code) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      title: 'Description',
      dataIndex: 'desc',
      sorter: (a: any, b: any) => {
        if (a.desc > b.desc) {
          return 1
        }
        if (b.desc > a.desc) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Type',
      dataIndex: 'name',
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
      title: 'Employer Account No.',
      dataIndex: 'employerAcc',
      sorter: (a: any, b: any) => {
        if (a.employerAcc > b.employerAcc) {
          return 1
        }
        if (b.employerAcc > a.employerAcc) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Employer Percentage',
      dataIndex: 'employerAmount',
      sorter: (a: any, b: any) => {
        if (a.employerAmount > b.employerAmount) {
          return 1
        }
        if (b.employerAmount > a.employerAmount) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Employee Account No.',
      dataIndex: 'employeeAcc',
      sorter: (a: any, b: any) => {
        if (a.employeeAcc > b.employeeAcc) {
          return 1
        }
        if (b.employeeAcc > a.employeeAcc) {
          return -1
        }
        return 0
      },
    },
    {
      title: 'Employee Percentage',
      dataIndex: 'employeeAmount',
      sorter: (a: any, b: any) => {
        if (a.employeeAmount > b.employeeAmount) {
          return 1
        }
        if (b.employeeAmount > a.employeeAmount) {
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
          
          {/* <Link to={`/setup/sections/${record.id}`}>
            <span className='btn btn-light-info btn-sm'>Sections</span>
          </Link> */}
          <a href='#' className='btn btn-light-warning btn-sm'>
            Update
          </a>
          <a onClick={() => handleDelete(record)} className='btn btn-light-danger btn-sm'>
            Delete
          </a>
         
        </Space>
      ),
      
    },
  ]

  const SAVINGS_SCHEME=[
    {
     code: "001",
     name: "INTPF",
     desc: "INTERNAL PROVIDENT FUND",
     "Employer Type": "PERMANENT",
     employerAcc: 238976,
     employerAmount: 0.06,
     "Employee Type": "PERMANENT",
     employeeAcc: 774323,
     employeeAmount: 0.04,
     "Statutory": "YES"
    },
    {
     code: "002",
     name: "FUNF",
     desc: "FUNERAL FUND",
     "Employer Type": "PERMANENT",
     employerAcc: 238976,
     employerAmount: 0.1,
     "Employee Type": "PERMANENT",
     employeeAcc: 774323,
     employeeAmount: 0.1,
     "Statutory": "NO"
    }
    
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
          <Table columns={columns}  dataSource={SAVINGS_SCHEME}/>
          <Modal
            title='SNNIT Setup'
            open={isModalOpen}
            onCancel={handleCancel}
            closable={true}
            width={860}
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
                  <div className='col-6 mb-7'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Code</label>
                    <input type="text" name="code"  className="form-control form-control-solid"/>
                  </div>
                  <div className='col-6 mb-7'>
                  <label htmlFor="exampleFormControlInput1" className="required form-label">Name</label>
                    <input type="text" name="name"  className="form-control form-control-solid"/>
                  </div>
                </div>
                <div style={{padding: "0px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-7'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Description</label>
                    <input type="text" name="desc"  className="form-control form-control-solid"/>
                  </div>
                  <div className='col-6 mb-7'>
                  <label htmlFor="exampleFormControlInput1" className="required form-label">Employer Type</label>
                    {/* <input type="text" name="field1"  className="form-control form-control-solid"/> */}
                    <select className="form-select form-select-solid" aria-label="Select example">
                      <option>select </option>
                      <option value="1">PERMANENT</option>
                     
                    </select>
                  </div>
                </div>
                <div style={{padding: "0px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-7'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Employer Account No.</label>
                    <input type="text" name="field1"  className="form-control form-control-solid"/>
                  </div>
                  <div className='col-6 mb-7'>
                  <label htmlFor="exampleFormControlInput1" className="required form-label">Employer Amount</label>
                    <input type="text" name="field1"  className="form-control form-control-solid"/>
                  </div>
                </div>
                <div style={{padding: "0px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-7'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Employee Type</label>
                    {/* <input type="text" name="field1"  className="form-control form-control-solid"/> */}
                    <select className="form-select form-select-solid" aria-label="Select example">
                      <option>select</option>
                      <option value="1">PERMANENT</option>
                      
                    </select>
                  </div>
                  <div className='col-6 mb-7'>
                  <label htmlFor="exampleFormControlInput1" className="required form-label">Employee Account No.</label>
                    <input type="text" name="field1"  className="form-control form-control-solid"/>
                  </div>
                </div>
                <div style={{padding: "0px 20px 0 20px"}} className='row mb-0 '>
                  <div className='col-6 mb-7'>
                    <label htmlFor="exampleFormControlInput1" className="required form-label">Employee Amount</label>
                    <input type="text" name="field1"  className="form-control form-control-solid"/>
                  </div>
                  {/* <div className='col-6 mb-7'>
                  <label htmlFor="exampleFormControlInput1" className="required form-label">Statutory</label>
                  
                    <select className="form-select form-select-solid" aria-label="Select example">
                      <option>select</option>
                      <option value="1">YES</option>
                      <option value="2">NO</option>
                    </select>
                  </div> */}
                </div>
              </Form>
            </Modal>
        </div>
      </KTCardBody>
    </div>
  )
}

export {SNNIT}
