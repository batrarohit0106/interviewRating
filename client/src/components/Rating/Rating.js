import React, {useState} from 'react';
import {Card, Tooltip, Typography, Image} from "antd";
import {EditOutlined, DeleteTwoTone } from "@ant-design/icons"
import { useDispatch } from 'react-redux';
import styles from './styles'
import { deleteRating } from '../../actions/ratings';
import { Rate } from 'antd';

const {Meta} = Card;
const {Link, Paragraph, Text} = Typography

function Rating({rating, setSelectedId}){
    const dispatch = useDispatch();
    const [expand, setExpand] = useState(true);

    const user = JSON.parse(localStorage.getItem("profile"));
    const cardActions = [
        <Tooltip
            placement='top'
            title='Edit'
        >

            <EditOutlined onClick={()=>{
                // console.log(user?.result?.id)
                // console.log(rating?.postedBy)
                // console.log(rating.id)
                // debugger;
                setSelectedId(rating.id);
            }}/>
        </Tooltip>,
        <Tooltip
            placement='top'
            title='Delete'
            color='red'
        >
            <DeleteTwoTone twoToneColor="red" onClick={()=> dispatch(deleteRating(rating.id))}/>
        </Tooltip>
    ];

    return (
        <Card 
            style={styles.card}
            // cover={<Image src = {rating.image} style={styles.image}/>}
            actions={
                user?.result?.id === rating?.postedBy ? cardActions : user?.result ? cardActions.slice(0,0) : null
            }>

            <Meta title={rating.name}/>
            <Paragraph
                style={{margin:0}}
                ellipsis={{
                    rows: 2,
                    expandable: true,
                    symbol: "more",
                    onExpand:()=>{setExpand(true)},
                    onEllipsis:()=>{setExpand(false)}
                }}
                >
                {rating.contact}
                
                
            </Paragraph>
            {/* {expand ?
                <Link href="#">{`₹${rating.price} `}</Link>
            : null } */}
            <Text strong="true">Status: {rating.interviewStatus}</Text>
            <br/>
            {/* <Link href="#">{`${rating.rating} `}</Link> */}
            <Link href="#" className="star-link">
            <Rate disabled defaultValue={rating.rating} />
            </Link>
            <br/>
            <Text strong="true" style={{color: "green"}}>Feedback : {`${rating.feedback}`}</Text>
        </Card>
    )
}

export default Rating;