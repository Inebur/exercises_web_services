import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return(
    <div>
        {parts.map(part => <Part key={part.id} part={part}/> )}
    </div>
  )
}


const Course = (props) => {

   
    var exercises = []
    props.course.parts.forEach(part => {
      exercises.push(part.exercises)
    });
  
    const initialValue = 0;
    const sumWithInitial = exercises.reduce(
      (previousValue, currentValue) => previousValue + currentValue, initialValue
    );
  
    return(
      <div>
          <Header course={props.course.name } />
          <Content parts={props.course.parts} />
          <Total sum={sumWithInitial}/>
      </div>
    )

}

export default Course