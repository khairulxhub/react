function Event(){
    const handelClick = () => {
        console.log("Button Clicked")
    }
    // function handleClick(){
    //     console.log("Button Clicked")
    // }
    return(
        <>
            <button onClick={handelClick}>Click Event</button>
        </>
    )
}
export default Event