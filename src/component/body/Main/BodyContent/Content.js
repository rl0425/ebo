import React, {useEffect, useState, useRef} from "react"
import {v4 as uuidv4} from "uuid";
import classes from "./Content.module.css"

import useHttp from "../../../../hooks/use-http";
import {useSelector, useDispatch} from "react-redux";
import {categoryActions} from "../../../../store/category-slice";
import {modalActions} from "../../../../store/modal-slice";

function Content(props){
    const [tasks, setTasks] = useState([]);
    const [times, setTimes] = useState([]);
    const { isLoading, error, sendRequest: fetchTasks } = useHttp();

    const dispatch = useDispatch()
    const category = useSelector((state) => state.category.category)

    const [pageNumber, setPageNumber] = useState(0);

    const bottomBoundaryRef = useRef(null);
    const noRef = useRef(null);


    const loadMoreData = () => {
        setPageNumber(pageNumber + 1);
    };

    const optClickEvt = (ele) => {
        dispatch(modalActions.changePostOpen({open: true, id: ele}))
    }

    useEffect(() => {
        const transformTasks = (tasksObj) => {
            setTasks((prevTasks) => [...prevTasks, ...tasksObj]);
            // dispatch(categoryActions.addCategory({id: props.data.categoryId, data: tasksObj}))
        };

        const data = category.find(u => u.id === props.data.categoryId)

        if(true){

            // fetchTasks(
            //     {url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/${1}?count=10&page=1`},
            //     transformTasks
            // );

            props.data.subCategories.map((ele) => {
                fetchTasks(
                    {url: `http://explorer-cat-api.p-e.kr:8080/api/v1/post/${ele.id}?count=10&page=1`},
                    transformTasks
                );
            })
        }
        else{
            setTasks(data.data)
        }

    }, []);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting) {
    //                 loadMoreData();
    //             }
    //         },
    //         { rootMargin: '0px 0px 100% 0px' } // Set the threshold for when to trigger the function
    //     );
    //
    //     if (bottomBoundaryRef.current) {
    //         observer.observe(bottomBoundaryRef.current);
    //     }
    //
    //     return () => {
    //         if (bottomBoundaryRef.current) {
    //             observer.unobserve(bottomBoundaryRef.current);
    //         }
    //     };
    // }, [bottomBoundaryRef, loadMoreData]);

    const tasks2 = [{title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}, {title:"123", content:"456"}]

    if(isLoading){
        return <div>asdas</div>
    }

    else if(error){
        return <div>error</div>
    }

    else {
        // if(props.pageIndex ===  props.index) {
        //     props.setHeightEvt(tasks.length)
        // }
        // console.log("props = ", props.data)

        return (
            <div style={{height: "fit-content", maxHeight: "fit-content"}} className={times ? `${classes.loadBox} ${classes.load}` : classes.loadBox}>
                {tasks.map((ele, index) => {
                    return (
                        <div key={uuidv4()} ref={index === 5 ? bottomBoundaryRef : noRef} className={times ? `${classes.box} ${classes.load}` : classes.box}>
                            <div className={classes.qSpanBox}>
                                <div className={classes.qSpan}><span>Q.</span></div>
                            </div>
                            <div className={classes.contentBox}>
                                <div className={classes.questionBox}><span>{ele.title}</span></div>
                                <div className={classes.answerBox}><span>{ele.content}</span></div>
                                <div className={classes.optBox}>
                                    <div>
                                        <img style={{width: "20px", height: "17px"}} src={"images/icons/heart.png"}/>
                                        <span>99</span>
                                    </div>
                                    <img style={{width: "20px", height: "17px"}} src={"images/icons/star.png"}/>
                                    <div onClick={() => optClickEvt(ele.id)}>
                                        <img style={{width: "3px", height: "14px"}} src={"images/icons/option.png"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}


const MemoizedContent = React.memo(Content);

export default MemoizedContent;
