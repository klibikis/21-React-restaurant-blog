import { NavLink } from "react-router-dom";
import style from "./Comments.module.scss";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

type CommentsProps = {
    id: any
}

const Comments = ({id}: CommentsProps) => {

    const [commentValue, setCommentValue] = useState("")

    const getComments = () => {
        return axios.get(`http://localhost:3000/comments?postId=${id}&_start=0&_end=10`)
        .then(res => {
            return res.data 
    })}

    const addComment = (comment: string) => {
        return axios.post(`http://localhost:3000/comments`, {
            postId: id,
            comment: comment
    })}

    const postComment = () => {
        const queryClient =  useQueryClient()
        return useMutation(addComment, {
            onSuccess: () => {
                queryClient.invalidateQueries(["comment", id])
            }
        })
    }

    const { mutate, isLoading, isError, error: postError } = postComment()
        

    //     if(mutation.status === "loading")<h1>Loading...</h1>
    //     if(mutation.status === "error")<h1>Error</h1>
    //     if(mutation.status === "success")console.log("YEsss")
    // }



    const handleCommentSubmit = () => {
        mutate(commentValue)
        if(isLoading===true)<h1>Loading..........</h1>
        if(isError===true)<h1>Error</h1>
        
        setCommentValue("")
    }

    const {status, error, data} = useQuery({
        queryKey: ["comment", id],
        queryFn: getComments,
    })

    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>



    return (
        <>
            <div>
                <h1 className={style.title}>Comments section</h1>
            </div>
            <div className={style.commentsWrapper}>
                {data.map((comment: any) => (
                    <div key={uuid()} className={style.comment}>
                        {comment.comment}
                    </div>
                ))}
                <h1 className={style.title}>Add new comment:</h1>
                <form
                    className={style.addComment}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCommentSubmit();
                    }}
                >
                    <textarea
                        name={"comment"}
                        required
                        rows={4}
                        className={style.commentInput}
                        value={commentValue}
                        onChange={(e) => {
                            e.preventDefault();
                            setCommentValue(e.target.value);
                        }}
                    ></textarea>
                    <button className={style.button}>
                        <p>Add comment</p>
                    </button>
                </form>
            </div>
        </>
    );
};

export default Comments;
