import React from 'react'
import {Row, Col, Spin} from "antd"
import Rating from '../Rating'
import { useSelector } from 'react-redux'
import styles from './styles'

const RatingList = ({setSelectedId}) => {
  const ratings = useSelector((state)=>state.ratings)
  // const id = []
  console.log(ratings)

  return !ratings.length ? 
  <div style={{textAlign:"center"}}>
    <Spin size="large"/>
  </div> :
  (
    <Row gutter={[20, 20]} style={styles.rows}>
        {
          ratings.map((rating) => {
            return (
              <Col key ={rating.id} lg={12} xl={8} xxl={6}>
                <Rating setSelectedId={setSelectedId} rating={rating}/>
              </Col>
            )
          })
        }
    </Row>
  )
}

export default RatingList