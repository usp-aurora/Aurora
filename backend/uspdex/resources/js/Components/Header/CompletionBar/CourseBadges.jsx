import React from 'react';
import styled from 'styled-components';

const BadgeSection = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto); // 3 colunas com largura automática
    grid-column-gap: 24px;
    grid-row-gap: 16px;
`;

const Badge = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const BadgeIcon = styled.img`
    width: 24px;
    height: 24px;

    filter: ${(props) => (props.completed ? 'none' : 'grayscale(100%) brightness(1.5)')};
`;


const CourseBadges = () => {
    const badges = {
        'Ciência de Dados': {
            completed: false,
            imagePath: './icons/badges/badge_dados.png'
        },
        'Sistemas de Software': {
            completed: true,
            imagePath: './icons/badges/badge_sistemas.png'
        },
        'Optativa de Ciências': {
            completed: true,
            imagePath: './icons/badges/badge_ciencias.png'
        },
        'Inteligência Artificial': {
            completed: false,
            imagePath: './icons/badges/badge_ia.png'
        },
        'Teoria da computação': {
            completed: false,
            imagePath: './icons/badges/badge_teoria.png'
        },
        'Optativa de Estatística': {
            completed: true,
            imagePath: './icons/badges/badge_estatistica.png'
        }
    };

    return (
        <BadgeSection>
            {Object.keys(badges).map((badgeName) => (
                <Badge key={badgeName}>
                    <BadgeIcon src={badges[badgeName].imagePath} completed={badges[badgeName].completed}/>
                    <h3>{badgeName}</h3>
                </Badge>
            ))}
        </BadgeSection>
    );
};

export default CourseBadges;