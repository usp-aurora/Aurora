import React from 'react';
import styled from 'styled-components';

const CardContentCourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  text-align: center;
`;

const PokemonContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Pokemon = styled.img`
  width: 72px;
  height: 72px; 

  position: absolute;
  z-index: 1;
`

const PokeballBackground = styled.div`
  margin-top: 10px;
  width: 56px;
  height: 56px;
`
const CourseTitleParagraph = styled.p`
  margin-top: -2px;
`


const CardContentCourse = ({pokeball, courseCode, courseTitle, pokemonURL}) => {
  return (
    <CardContentCourseContainer>
      <PokemonContainer>
        <Pokemon src={pokemonURL} />
        <PokeballBackground>
          <svg viewBox="0 0 56 56" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M52.5 37.3333V18.6721V18.6667H52.5147H56V37.3333H52.5Z" fill={pokeball}/>
            <path d="M37.3333 56H18.6667V52.5H37.3333V56Z" fill={pokeball}/>
            <path d="M45.4765 52.5154L37.3333 52.5L37.3399 49L37.34 48.9954L39.7615 49L45.4831 49.0108L45.4765 52.5154Z" fill={pokeball}/>
            <path d="M18.6432 7.01996L10.5 7.00458V7L10.5066 3.5L18.6498 3.51538L18.6432 7L18.6432 7.01996Z" fill={pokeball}/>
            <path d="M18.6432 52.5154L10.5 52.5L10.5066 49L10.5066 48.9954L12.9281 49L18.6498 49.0108L18.6432 52.5154Z" fill={pokeball}/>
            <path d="M7.01541 37.3345L7 45.4903L6.99998 45.5L3.48525 45.4934L3.50068 37.3278L7 37.3333L7.01541 37.3345Z" fill={pokeball}/>
            <path d="M52.5302 37.34L52.5147 45.5055L49 45.4989L49.0154 37.3333L52.5302 37.34Z" fill={pokeball}/>
            <path d="M48.9775 48.9986L45.4998 48.9921L45.5 48.8626L45.5064 45.5L45.52 45.5L48.9841 45.5066L48.9775 48.9986Z" fill={pokeball}/>
            <path d="M10.5 49L6.99974 48.9934L7.00634 45.5L10.5 45.5066L10.5066 45.5066L10.5 49Z" fill={pokeball}/>
            <path d="M10.5003 10.5L7 10.4934L7.0066 7L10.5 7.0066L10.5069 7.00661L10.5003 10.5Z" fill={pokeball}/>
            <path d="M49.0002 10.5L45.5 10.4934L45.5 10.491L45.5066 7L49.0068 7.00661L49.0002 10.5Z" fill={pokeball}/>
            <path d="M37.3333 45.5V37.3333H18.6667V45.5H37.3333Z" fill={pokeball}/>
            <path d="M37.3333 37.3333V45.5H45.5V37.3333H37.3333Z" fill={pokeball}/>
            <path d="M45.5 37.3333V45.5L45.5064 45.5L45.52 45.5L49 45.4989V37.3333H45.5Z" fill={pokeball}/>
            <path d="M45.5 45.5H37.3333V49H37.3399L37.34 48.9954L39.7615 49H45.5L45.4998 48.9921L45.5 48.8626V45.5Z" fill={pokeball}/>
            <path d="M18.6667 52.5H37.3333V49H18.6667V52.5Z" fill={pokeball}/>
            <path d="M10.5066 45.5066L10.5 49H10.5066L10.5066 48.9954L12.9281 49H18.6667V45.5H10.5V45.5066L10.5066 45.5066Z" fill={pokeball}/>
            <path d="M10.5 45.5V37.3333H7L7.01541 37.3345L7 45.4903L6.99998 45.5H7.00634H10.5Z" fill={pokeball}/>
            <path d="M3.5 31.5V37.3333L3.50068 37.3278L7 37.3333V31.5H3.5Z" fill={pokeball}/>
            <path d="M18.6667 45.5V37.3333H10.5V45.5H18.6667Z" fill={pokeball}/>
            <path d="M10.5 37.3333V31.5H7V37.3333H10.5Z" fill={pokeball}/>
            <path d="M18.6667 37.3333V31.5H10.5V37.3333H18.6667Z" fill={pokeball}/>
            <path d="M24.5 31.5H21H18.6667V37.3333H37.3333V31.5H35H31.5V35H24.5V31.5Z" fill={pokeball}/>
            <path d="M37.3333 37.3333H45.5V31.5H37.3333V37.3333Z" fill={pokeball}/>
            <path d="M45.5 37.3333H49V31.5H45.5V37.3333Z" fill={pokeball}/>
            <path d="M37.3333 45.5H18.6667V49H37.3333V45.5Z" fill={pokeball}/>
            <path d="M49.0154 37.3333H52.5V31.5H49V37.3333H49.0154Z" fill={pokeball}/>
            <path d="M49 18.6655V28H52.5V18.6721L49 18.6655Z" fill={pokeball}/>
            <path d="M49 18.6655L45.5 18.6667V28H49V18.6655Z" fill={pokeball}/>
            <path d="M37.3333 18.6667V28H45.5V18.6667H37.3333Z" fill={pokeball}/>
            <path d="M24.5 21H31.5V24.5H35V28H37.3333V18.6667H18.6667V28H21V24.5H24.5V21Z" fill={pokeball}/>
            <path d="M10.5 18.6667V28H18.6667V18.6667H10.5Z" fill={pokeball}/>
            <path d="M7 18.6721V28H10.5V18.6667H7.01474L7.01473 18.6722L7 18.6721Z" fill={pokeball}/>
            <path d="M7.01474 18.6667H10.5L10.5003 10.5L7 10.5V10.5066L7.03016 10.5066L7.01474 18.6667Z" fill={pokeball}/>
            <path d="M10.5 18.6667H18.6667V10.5L10.5003 10.5L10.5 18.6667Z" fill={pokeball}/>
            <path d="M18.6432 7.01996L10.5 7.00458V7.0066L10.5069 7.00661L10.5003 10.5L18.6667 10.5V7H18.6432L18.6432 7.01996Z" fill={pokeball}/>
            <path d="M18.6667 10.5H37.3333V7.00458L37.3333 7H18.6667V10.5Z" fill={pokeball}/>
            <path d="M37.3333 3.5H18.6667V7H37.3333L37.3333 3.5Z" fill={pokeball}/>
            <path d="M18.6667 18.6667H37.3333V10.5H18.6667V18.6667Z" fill={pokeball}/>
            <path d="M37.3333 10.5V18.6667H45.5V10.5H37.3333Z" fill={pokeball}/>
            <path d="M45.4765 7.01996L37.3333 7.00458V10.5H45.5L45.5 10.4934L45.5 10.491V7H45.4766L45.4765 7.01996Z" fill={pokeball}/>
            <path d="M45.5 10.5V18.6667L49 18.6655L49.0002 10.5L45.5 10.5Z" fill={pokeball}/>
            <path d="M3.51543 10.5L3.5 18.6667H7V10.5066L3.51543 10.5Z" fill={pokeball}/>
            <path d="M37.3333 0L18.6667 0V3.5H37.3333V0Z" fill={pokeball}/>
            <path d="M45.4831 3.51538L37.34 3.5L37.3333 7H45.4766L45.4831 3.51538Z" fill={pokeball}/>
            <path d="M49.0154 10.5L49 18.6655L52.5 18.6667V10.5066L49.0154 10.5Z" fill={pokeball}/>
            <path d="M31.5 24.5H24.5V28H31.5V24.5Z" fill={pokeball}/>
            <path d="M24.5 31.5H31.5V28H24.5V31.5Z" fill={pokeball}/>
            <path d="M3.5 37.3333V31.5V28V18.6667H0L0 37.3333H3.5Z" fill={pokeball}/>
            <path d="M3.5 18.6667V28H7V18.6721L3.5 18.6667Z" fill={pokeball}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7 7V10.5H3.51543H3.5V18.6667L7 18.6721L7.01473 18.6722L7.01474 18.6667L7.03016 10.5066L7 10.5066V10.5L10.5003 10.5L10.5069 7.00661L10.5 7.0066V7.00458L18.6432 7.01996L18.6432 7H18.6667V3.5H10.5V7H7ZM7 10.5066L3.51543 10.5L3.5 18.6667H7V10.5066ZM52.5 37.3333V31.5V28V18.6721L49 18.6655L52.5 18.6667V10.5066L52.5302 10.5066L52.5147 18.6667H56V37.3333H52.5ZM49 45.4989V37.3333H49.0154H52.5V45.5L49 45.4989ZM45.5 49L45.4998 48.9921L45.5 48.8626V45.5L45.5064 45.5L45.52 45.5L49 45.4989V49H45.5ZM37.3333 52.5V49H37.3399L37.34 48.9954L39.7615 49H45.5V52.5H37.3333ZM18.6667 52.5H37.3333V56H18.6667V52.5ZM10.5 49H10.5066L10.5066 48.9954L12.9281 49H18.6667V52.5H10.5V49ZM6.99998 45.5H7.00634H10.5V45.5066L10.5066 45.5066L10.5 49H7L6.99998 45.5ZM6.99998 45.5H3.5V37.3333L3.50068 37.3278L7 37.3333L7.01541 37.3345L7 45.4903L6.99998 45.5ZM49.0154 10.5H52.5V10.5066L49.0154 10.5ZM49.0002 10.5L49.0154 10.5L49 18.6655L49.0002 10.5ZM45.5 7H49L49.0002 10.5L45.5 10.5L45.5 10.4934L45.5 10.491V7ZM45.4766 7H45.5V3.5H37.34H37.3333L37.3333 7L37.3333 7.00458L45.4765 7.01996L45.4766 7ZM45.4766 7H37.3333L37.34 3.5L45.4831 3.51538L45.4766 7Z" fill={pokeball}/>
          </svg>
        </PokeballBackground>
      </PokemonContainer>
      <h2>{courseCode}</h2>
      <CourseTitleParagraph>
        {courseTitle}
      </CourseTitleParagraph>
    </CardContentCourseContainer>

  );
};

export default CardContentCourse;