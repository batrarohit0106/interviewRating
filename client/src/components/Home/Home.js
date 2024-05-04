import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import RatingList from "../RatingList";
import RatingForm from "../RatingForm";
import { Layout } from "antd";
import styles from "./styles";
import {getRatings} from "../../actions/ratings";

const {Sider, Content} = Layout;
const Home = () => {
    const dispatch = useDispatch();
    const [selectedId,setSelectedId] = useState(null);
    const user = JSON.parse(localStorage.getItem("profile"));
    const userId = user?.result?.id;
    console.log("user id: ",userId);
    useEffect(()=>{
        dispatch(getRatings(userId));
    }, [dispatch,userId]);
    
    return (
        <Layout>
            <Sider style={styles.sider} width={400}>
                <RatingForm selectedId={selectedId} setSelectedId={setSelectedId}/>
            </Sider>
            <Content style={styles.content}>
                <RatingList setSelectedId={setSelectedId}/>
            </Content>
        </Layout>
    )
}

export default Home;