import './Item.css'
function Item(props) {
    return (
        <>
            {
                [...Array(2)].map((_, i) => {
                    return <li className="hoge" onClick={() => props.handleClick(i)} key={i}>{i}</li>
                })
            }
        </>
    )
}
export default Item;