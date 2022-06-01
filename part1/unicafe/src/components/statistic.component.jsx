import StatisticLine from './statisticline.component';

const Statistic = ({vote}) => {
    if(vote.reduce((acc,val)=>acc+val,0)===0){
        return (<p>No feedback given</p>)
    }else{
        return(
            <table><tbody>
                <StatisticLine text="good" value={vote[0]} />
                <StatisticLine text="neutral" value={vote[1]} />
                <StatisticLine text="bad" value={vote[2]} />
                <StatisticLine text="all" value={vote.reduce((acc,val)=>acc+val,0)} />
                <StatisticLine text="average" value={(vote[0]*1+vote[2]*-1)/vote.reduce((acc,val)=>acc+val,0)} />
                <StatisticLine text="positive" value={vote[0]/vote.reduce((acc,val)=>acc+val,0)*100+'%'} />                
            </tbody></table>
        )
    }

}

export default Statistic