function Event() {
    const handelClick = () => {
        console.log("Button clicked")
    }
    return (
        <>
            <button onClick={handelClick}>Click</button>
        </>
    )
}
export default Event