import Part from './part.component'

const Content = ({content}) => {
    return (
        <>
            {content.map(({name,exercises})=>(
                <Part key={name} part={name} exercises={exercises} />
            ))}
        </>
    )
}

export default Content;