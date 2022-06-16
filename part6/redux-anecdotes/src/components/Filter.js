//import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {    
    return (<label>filter: <input type="search" value={props.filterText} onChange={(e)=>props.setFilter(e.target.value)} name="filterText" /></label>) 
}

const mapStateToProps = state => ({filterText: state.filter})
const ConnectedFilter = connect(
    mapStateToProps,
    { setFilter }
)(Filter)

export default ConnectedFilter
