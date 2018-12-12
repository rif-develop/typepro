const List = ({ items, filterBy }) => {
    return (
        <ul>
            {
                items
                    .filter(item => item.indexOf(filterBy) > -1)
                    .map((item, i) => <li key={i}>{item}</li>)
            }
        </ul>
    )
}