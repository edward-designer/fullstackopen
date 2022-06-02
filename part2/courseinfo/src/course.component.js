export const Course = ({ course }) => {
    const {id,name,parts} = course;
    return (
      <>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
        <hr />
      </>
    )
  };
  
const Header = ({ name }) => <h2>{name}</h2>;
  
const Total = ({ parts }) => {
    const sum = parts.reduce((acc,part)=>acc+part.exercises,0);
    return (<p><strong>total of {sum} exercises</strong></p>);
  };
  
const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );
  
const Content = ({ parts }) => (
    <>
      {
        parts.map(part => <Part key={part.id} part={part} />)
      }  
    </>
  );
  