import React, { useState } from "react";
import Droppable from "../Dnd/Droppable";
import SortableItem from "../Dnd/SortableItem";
import { slideIn, slideIn2, slideOut, slideOut2 } from "../Atomsold/Animations";
import Card from "../Atomsold/Card";
import CardContentCourse from "../Atomsold/CardContentCourse";
// import { ReactComponent as ThinButtonBlueBackgroundSVG } from '../../assets/ThinButtonBlueBackground.svg';
// import { ReactComponent as AplicarTextIconSVG } from '../../assets/AplicarTextIcon.svg';

const PlaceholderBackground = styled("div")(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#1A1C24",
    zIndex: -1,

    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

const PopUpContainer = styled("div")(({ open, theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: open ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999,
    },
}));

const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.spacing(2),

    margin: theme.spacing(1),
    marginTop: theme.spacing(2),

    [theme.breakpoints.up("sm")]: {
        ...glassmorphismStyle(theme, "level2"),
        margin: 0,
        padding: theme.spacing(2),
        minHeight: "93vh",
        borderRadius: "12px",
    },
}));

const HeaderContainer = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",

    ...theme.typography.h4,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h2,
    },
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
    display: "block",
    color: theme.palette.white.main,
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

// const CoursePickerContainer = styled(Droppable)`
//   width: 40%;
//   margin: 1%;
//   padding: 20px;

//   background-color: #E4EEFA;

//   clip-path: polygon(
//     0px calc(100% - 8px),
//     4px calc(100% - 8px),
//     4px calc(100% - 4px),
//     8px calc(100% - 4px),
//     8px 100%,
//     calc(100% - 8px) 100%,
//     calc(100% - 8px) calc(100% - 4px),
//     calc(100% - 4px) calc(100% - 4px),
//     calc(100% - 4px) calc(100% - 8px),
//     100% calc(100% - 8px),
//     100% 8px,
//     calc(100% - 4px) 8px,
//     calc(100% - 4px) 4px,
//     calc(100% - 8px) 4px,
//     calc(100% - 8px) 0px,
//     8px 0px,
//     8px 4px,
//     4px 4px,
//     4px 8px,
//     0px 8px
//   );
// `;

// const Title = styled("div")`
//   text-align: left;
//   font-size: 32px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 1% 1% 3% 0;
// `;

const CategoryContainer = styled("div")`
  margin-bottom: 10px;
`;

const CategoryHeader = styled("div")`
  cursor: pointer;
`;

const CategoryHeaderInfos = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3% 3% 4% 3%;
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 20px;
`;

const NumberAndSign = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberCompleted = styled("p")`
  font-size: 15px;
  margin-right: 30px;
`;

const CategoryHeaderBackground = styled("div")`
  position: relative;
`;

const CourseGrid = styled("div")`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 50px;
  margin: 5px;
  max-height: ${({$expanded}) => ($expanded ? '500px' : '0')}; /* Define o limite de altura */
  animation: ${({$expanded}) => ($expanded ? slideIn2 : slideOut2)} 1s ease-in-out ${({$expanded}) => ($expanded ? '-0.1s' : '-0.6s')};
`;

const CourseCard = styled("div")`
  width: 100px;
  height: 100px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Categories = styled("div")`
  margin-top: 5%;
`;

const CoursePicker = ({
    categories,
    courseMap,
    displayCourse,
    openDisciplinePopUp,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCategories, setExpandedCategories] = useState(
        categories.reduce((acc, category) => {
            acc[category.name] = false;
            return acc;
        }, {})
    );

    const toggleCategory = (categoryName) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryName]: !prev[categoryName],
        }));
    };

    return (
        <PopUpContainer open={open}>
            <Container>
                <PlaceholderBackground />
                <HeaderContainer>
                    <StyledTitle>Adicionar disciplina</StyledTitle>
                    <StyledCloseIcon />
                </HeaderContainer>
                {/* Algum dia vai ter um search bar bem aqui */}
                {/* {data.subgrupos.map((group) => (
                    <Group data={group} />
                ))} */}

                <Categories>
                    {categories.map((category) => (
                        <CategoryContainer key={category.name}>
                            <CategoryHeader
                                onClick={() => toggleCategory(category.name)}
                            >
                                <CategoryHeaderBackground>
                                    <CategoryHeaderInfos>
                                        <span>{category.name}</span>
                                        <NumberAndSign>
                                            <NumberCompleted>
                                                {category.completed}{" "}
                                                {category.total ? "/" : ""}{" "}
                                                {category.total}
                                            </NumberCompleted>
                                            <span>
                                                {expandedCategories[
                                                    category.name
                                                ]
                                                    ? "▼"
                                                    : "▶"}
                                            </span>
                                        </NumberAndSign>
                                    </CategoryHeaderInfos>
                                    <svg
                                        width="100%"
                                        height="50%"
                                        viewBox="0 0 464 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 0H456V32V40H8V0Z"
                                            fill="#C2DCF5"
                                        />
                                        <path
                                            d="M4 32H8V36H4V32Z"
                                            fill={category.color}
                                        />
                                        <path
                                            d="M8 36H456V40H8V36Z"
                                            fill={category.color}
                                        />
                                        <path
                                            d="M4 8H8V4H4V8Z"
                                            fill="#C2DCF5"
                                        />
                                        <path
                                            d="M4 8H0V28H4V8Z"
                                            fill="#C2DCF5"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4 8H464V32H456H4V28V8Z"
                                            fill="#C2DCF5"
                                        />
                                        <path
                                            d="M0 32H4V28H0V32Z"
                                            fill={category.color}
                                        />
                                        <path
                                            d="M460 32H456V36H460V32Z"
                                            fill="#C2DCF5"
                                        />
                                    </svg>
                                </CategoryHeaderBackground>
                            </CategoryHeader>
                            <CourseGrid
                                $expanded={expandedCategories[category.name]}
                            >
                                {category.courses.map((course) => {
                                    const courseDetails = courseMap.get(
                                        course.id
                                    );
                                    console.log(courseDetails);
                                    const isBlocked = courseDetails.semester !== null;

                                    return (
                                        <SortableItem
                                            id={courseDetails.code}
                                            key={courseDetails.code}
                                            courseData={courseDetails}
                                            containerName={category.name}
                                            isDisabled={
                                                !expandedCategories[
                                                    category.name
                                                ] || isBlocked
                                            }
                                        >
                                            <Card
                                                colors={courseDetails.colors}
                                                onClick={() =>
                                                    displayCourse(courseDetails)
                                                }
                                            >
                                                <CardContentCourse
                                                    pokeball={
                                                        courseDetails.pokeball
                                                    }
                                                    courseCode={
                                                        courseDetails.code
                                                    }
                                                    courseTitle={
                                                        courseDetails.title
                                                    }
                                                    pokemonURL="/pokemons/ditto.png"
                                                />
                                            </Card>
                                        </SortableItem>
                                    );
                                })}
                            </CourseGrid>
                        </CategoryContainer>
                    ))}
                </Categories>
            </Container>
        </PopUpContainer>
        // <CoursePickerContainer id='coursePicker'>
        //   <Title>
        //     <span>Adicionar Disciplinas</span>
        //   </Title>

        //   <Categories>
        //     {categories.map((category) => (
        //       <CategoryContainer key={category.name}>
        //         <CategoryHeader onClick={() => toggleCategory(category.name)}>
        //             <CategoryHeaderBackground>
        //               <CategoryHeaderInfos>
        //                 <span>{category.name}</span>
        //                 <NumberAndSign>
        //                   <NumberCompleted>{category.completed} {category.total ? '/' : '' } {category.total}</NumberCompleted>
        //                   <span>{expandedCategories[category.name] ? '▼' : '▶'}</span>
        //                 </NumberAndSign>
        //               </CategoryHeaderInfos>
        //               <svg width="100%" height="50%" viewBox="0 0 464 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                 <path d="M8 0H456V32V40H8V0Z" fill="#C2DCF5"/>
        //                 <path d="M4 32H8V36H4V32Z" fill={category.color}/>
        //                 <path d="M8 36H456V40H8V36Z" fill={category.color}/>
        //                 <path d="M4 8H8V4H4V8Z" fill="#C2DCF5"/>
        //                 <path d="M4 8H0V28H4V8Z" fill="#C2DCF5"/>
        //                 <path fillRule="evenodd" clipRule="evenodd" d="M4 8H464V32H456H4V28V8Z" fill="#C2DCF5"/>
        //                 <path d="M0 32H4V28H0V32Z" fill={category.color}/>
        //                 <path d="M460 32H456V36H460V32Z" fill="#C2DCF5"/>
        //               </svg>
        //             </CategoryHeaderBackground>
        //         </CategoryHeader>
        //         <CourseGrid $expanded={expandedCategories[category.name]}>
        //           {category.courses
        //             .map((course) => {
        //               const courseDetails = courseMap.get(course.id);
        //               const isBlocked = courseDetails.semester !== null;

        //               return (
        //                 <SortableItem
        //                   id={courseDetails.code}
        //                   key={courseDetails.code}
        //                   courseData={courseDetails}
        //                   containerName={category.name}
        //                   isDisabled={!expandedCategories[category.name] || isBlocked}
        //                 >
        //                   <Card
        //                     colors={courseDetails.colors}
        //                     onClick={() => displayCourse(courseDetails)}
        //                   >
        //                     <CardContentCourse
        //                       pokeball={courseDetails.pokeball}
        //                       courseCode={courseDetails.code}
        //                       courseTitle={courseDetails.title}
        //                       pokemonURL="/pokemons/ditto.png"
        //                     />
        //                   </Card>
        //                 </SortableItem>
        //               );
        //             })}
        //         </CourseGrid>
        //       </CategoryContainer>
        //     ))}
        //   </Categories>
        // </CoursePickerContainer>
    );
};

export default CoursePicker;
