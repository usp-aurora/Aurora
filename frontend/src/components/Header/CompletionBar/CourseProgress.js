import styled from 'styled-components';

const CourseProgressContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto); // 3 colunas com largura automática
    grid-auto-rows: 16px; // altura da linha
    grid-column-gap: 8px;
    grid-row-gap: 16px;

    height: calc(100% - 32px);
`;

const ProgressBar = styled.div`
    width: 320px;
    height: 16px;

    position: relative;
    background-color: white;

    // border radius equivalent to 2. 
    // 2 pixels per 1 visual pixel
    clip-path: polygon(
        0px calc(100% - 2px),
        2px calc(100% - 2px),
        2px 100%,
        calc(100% - 2px) 100%,
        calc(100% - 2px) calc(100% - 2px),
        100% calc(100% - 2px),
        100% 2px,
        calc(100% - 2px) 2px,
        calc(100% - 2px) 0px,
        2px 0px,
        2px 2px,
        0px 2px
    );
`;

const ProgressCategoryText = styled.h3`
    text-align: right;
`

const PlannedProgressFill = styled.div`
    width: ${(props) => props.percentage}%;
    height: 100%;
    background-color: ${(props) => props.color};
    
    position: absolute;
    top: 0;
    left: 0;

    clip-path: polygon(
        0px calc(100% - 2px),
        2px calc(100% - 2px),
        2px 100%,
        calc(100% - 2px) 100%,
        calc(100% - 2px) calc(100% - 2px),
        100% calc(100% - 2px),
        100% 2px,
        calc(100% - 2px) 2px,
        calc(100% - 2px) 0px,
        2px 0px,
        2px 2px,
        0px 2px
    );
`;

const ProgressFill = styled.div`
    width: ${(props) => props.percentage}%;
    height: 100%;
    background-color: ${(props) => props.color};
    
    position: absolute;
    top: 0;
    left: 0;

    clip-path: polygon(
        0px calc(100% - 2px),
        2px calc(100% - 2px),
        2px 100%,
        calc(100% - 2px) 100%,
        calc(100% - 2px) calc(100% - 2px),
        100% calc(100% - 2px),
        100% 2px,
        calc(100% - 2px) 2px,
        calc(100% - 2px) 0px,
        2px 0px,
        2px 2px,
        0px 2px
    );
`;

const ProgressValuesContainer = styled.div`
    display: flex;
`

const ProgressValues = styled.span`
    color: ${(props) => props.color};
    font-size: 10px;
    line-height: 16px;

`

const CourseProgress = () => {
    // TODO: Replace for actual data

    const obrigatorias = {coursed : 10, planned: 40, needed: 54};
    const eletivas = {coursed : 10, planned: 40, needed: 60};
    const livres = {coursed : 20, planned: 23, needed: 24}

    return (
        <CourseProgressContainer>
            
            <ProgressCategoryText>Obrigatórias</ProgressCategoryText>
            <ProgressBar>
                <PlannedProgressFill color="rgba(141, 192, 236, 1)" percentage={(obrigatorias.planned / obrigatorias.needed) * 100} />
                <ProgressFill color="rgba(81, 161, 224, 1)" percentage={(obrigatorias.coursed / obrigatorias.needed) * 100} />
            </ProgressBar>
            <ProgressValuesContainer>
                {/* É necessário utilizar o "&nbsp;" no texto para que a flexbox respeite o espaço em branco */}
                <ProgressValues color="rgba(81, 161, 224, 1)">{`${obrigatorias.coursed}`}</ProgressValues> <ProgressValues>&nbsp;{`/ ${obrigatorias.needed}`}</ProgressValues>
            </ProgressValuesContainer>

            <ProgressCategoryText>Eletivas</ProgressCategoryText>
            <ProgressBar>
                <PlannedProgressFill color="rgba(255, 167, 255, 1)" percentage={(eletivas.planned / eletivas.needed) * 100} />
                <ProgressFill color="rgba(247, 62, 246, 1)" percentage={(eletivas.coursed / eletivas.needed) * 100} />
            </ProgressBar>
            <ProgressValuesContainer>
                <ProgressValues color="rgba(247, 62, 246, 1)">{`${eletivas.coursed}`}</ProgressValues> <ProgressValues>&nbsp;{`/ ${eletivas.needed}`}</ProgressValues>
            </ProgressValuesContainer>
            
            <ProgressCategoryText>Livres</ProgressCategoryText>
            <ProgressBar>
                <PlannedProgressFill color="#c4b580" percentage={(livres.planned / livres.needed) * 100} />
                <ProgressFill color="#837143" percentage={(livres.coursed / livres.needed) * 100} />
            </ProgressBar>
            <ProgressValuesContainer>
                <ProgressValues color="#837143">{`${livres.coursed}`}</ProgressValues> <ProgressValues>&nbsp;{`/ ${livres.needed}`}</ProgressValues>
            </ProgressValuesContainer>
        </CourseProgressContainer>
    );
}

export default CourseProgress;
