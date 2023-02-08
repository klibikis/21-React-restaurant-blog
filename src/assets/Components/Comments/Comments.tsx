import style from "./Comments.module.scss";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CommentsProps = {
    id: any
}

const Comments = ({id}: CommentsProps) => {

    const [commentValue, setCommentValue] = useState("")
    let user = localStorage.getItem('user')

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

    const deleteComment = (commentId: any) => {
        return axios.delete(`http://localhost:3000/comments/${commentId}`)
    }

    
    const deleteCommentFromDb = () => {
        const queryClient =  useQueryClient()
        return useMutation(deleteComment, {
            onSuccess: () => {
                queryClient.invalidateQueries(["comment", id])
            }
        })
    }
    const { mutate: deleteMutate, isLoading: deleteIsLoading, isError: deleteIsError, error: deleteError } = deleteCommentFromDb()


    const postCommentInDb = () => {
        const queryClient =  useQueryClient()
        return useMutation(addComment, {
            onSuccess: () => {
                queryClient.invalidateQueries(["comment", id])
            }
        })
    }
    const { mutate, isLoading, isError, error: postError } = postCommentInDb()
    


    const handleCommentSubmit = () => {
        mutate(commentValue)
        if(isLoading===true)<h1>Loading..........</h1>
        if(isError===true)<h1>Error</h1>
        toast.success('Comment added', {
            position: "bottom-left",
            autoClose: 2300,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "dark",
        });
        setCommentValue("")
    }


    const {status: getStatus, error: getError, data: getData} = useQuery({
        queryKey: ["comment", id],
        queryFn: getComments,
    })
    if (getStatus === "loading") return <h1>Loading...</h1>
    if (!getData) return <h1>{JSON.stringify(getError)}</h1>

    return (
        <>
            <div>
                <h1 className={style.title}>Comments section</h1>
            </div>
            <div className={style.commentsWrapper}>
                {getData.map((comment: any) => (
                    <div key={uuid()} className={style.comment} >

                        <p>{comment.comment}</p>
                        {user === "Admin" && <button 
                        className={style.button} 
                        onClick = {() => {
                            deleteMutate(comment.id)
                            toast.success('Comment deleted', {
                                position: "bottom-left",
                                autoClose: 2300,
                                hideProgressBar: false,
                                closeOnClick: true,
                                theme: "dark",
                            });
                        }}>X</button>}
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
