export default function PostShow({params} : {params: {id: string}}) {
    return (
        <div>
            <h1>Post Detail {params.id[2]}</h1>
        </div>
    )
};
