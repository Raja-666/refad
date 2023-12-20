import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetkycdataQuery } from 'src/app/services/adminkyc'
import { useColListMutation, useColUpdateMutation, useGetfindsingleuserQuery } from 'src/app/services/usrerList'

const VerifyCollection = () => {

    const [colList,] = useColListMutation()
    const [updateCol,] = useColUpdateMutation()

    const [list, setList] = useState([])
    const handleList = async () => {
        const res = await colList({
            // status: 0
        }).unwrap()
        setList(res.data)
        console.log(res.data)
    }


    const handleUpdate = async (_id, status) => {
        const res = await updateCol({
            status, _id
        }).unwrap()
        handleList()
    }
    useEffect(() => {
        handleList()
    }, [])

    /**
     * {
  "success": true,
  "data": [
    {
      "_id": "65736d862e5378ee3320fec3",
      "collectionName": "bnbbbbgy5",
      "description": "sss",
      "collectionUrl": "wewqe.dfsd",
      "address": "0xf72A545e573B83D675F840a4F05B2E4297D547Df",
      "__v": 0,
      "status": 1
    }
  ],
  "message": "Successfully get!!"
}
     */

    return (

        <>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">collection Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Approve</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Reject</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        list?.map((el, id) => {
                            const { collectionName, status, address, _id } = el

                            const sts = status === 0 ? 'Pending' : status === 1 ? 'Verified' : 'Unapprove'

                            console.log('el', el)
                            return (
                                <CTableRow key={id}>
                                    <CTableHeaderCell scope="row">{collectionName}</CTableHeaderCell>
                                    <CTableDataCell>
                                        {address}
                                    </CTableDataCell>
                                    <CTableDataCell>{sts}</CTableDataCell>
                                    <CTableDataCell>
                                        {status !== 1 && <button onClick={() => handleUpdate(_id, 1)}>Verify</button>}
                                    </CTableDataCell>

                                    <CTableDataCell> {status !==2 &&<button onClick={() => handleUpdate(_id, 2)}>Reject</button>} </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    }

                </CTableBody>
            </CTable>
        </>

    )
}

export default VerifyCollection
