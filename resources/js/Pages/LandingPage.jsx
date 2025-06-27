// LandingPage.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import Logo from '@/ui/Logo/Logo'; 

import globoImage from '../../images/landing_page/mundo.png';
import laptopImage from '../../images/landing_page/laptop_lado.png';
import exemplo1 from '../../images/landing_page/explicacao1.png';
import exemplo2 from '../../images/landing_page/explicacao2.png';
import exemplo3 from '../../images/landing_page/explicacao3.png';
import laptopFrente from '../../images/landing_page/laptop_frente.png';
import Background from '../Features/Background/HomeBackground';

const LandingPage = () => {
  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      <Background />
      <Box
        component="header"
        sx={{
          top: 0,
          left: 0,
          width: '100%',
          py: 2,
          bgcolor: 'transparent',
          backdropFilter: 'blur(5px)',
          paddingLeft: 2,
          paddingTop: 2,
          zIndex: 1000,
          mb: {xs: 0, md: 4}
        }}
      >
        <Logo />
      </Box>
      <Container maxWidth="xl">
        {/* ====== Hero Section ====== */}
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: { xs: 8, md: 25 },
          }}
        >
          {/* Texto */}
          <Box
            sx={{
              flex: 1,
              pr: { md: 4 },
              textAlign: 'left',
              mb: { xs: 0, md: 0 },
              width: "100%",
              backgroundColor: "red"
            }}
          >
            <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 6, fontSize: {xs: '48px', md: '72px'}, lineHeight: 1 }}>
              SEU SEMESTRE <br /> 
              COMEÇA AQUI
            </Typography>
            <Typography variant="body1" sx={{ mb: 6, opacity: 0.8, fontSize: '18px', textAlign: 'justify' }}>
              Planeje sua graduação com estratégia. Preveja a grade de cada semestre, organize
              optativas para completar ênfases de formação e acompanhe os créditos que faltam
              até o diploma.&nbsp;
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                Entre com o ID USP e comece agora a usar Aurora.
              </Box>
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: '50px',
                px: 4.5,
                py: 1,
                fontWeight: 'bold',
                fontSize: '18px'
              }}
              onClick={() => window.location.href = '/login'}
            >
              ENTRAR AGORA
            </Button>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7, fontSize: '18px' }}>
              ou comece pelo 
              <Button
                variant="text"
                sx={{
                  color: 'inherit',
                  textTransform: 'none',
                  fontSize: 'inherit',
                  '& :hover': {
                    backgroundColor: 'transparent',  
                  }
                }} 
                onClick={() => window.location.href = '/anonymous'}
              >

                <u>modo anônimo</u>
              </Button>
            </Typography>
          </Box>

          {/* Imagens sobrepostas */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              height: { xs: 300, md: 450 },
              display: { xs: 'none', md: 'flex'}
            }}
          >
            {/* Globo atrás */}
            <Box
              component="img"
              src={globoImage}
              alt="Globo Aurora"
              sx={{
                position: 'absolute',
                bottom: '17%',
                left: '10%',
                width: { xs: '80%', md: '90%' },
                maxWidth: 550,
                zIndex: 1,
              }}
            />

            {/* Laptop na frente */}
            <Box
              component="img"
              src={laptopImage}
              alt="Laptop Aurora"
              sx={{
                position: 'absolute',
                top: '-21%',
                left: '-15%',
                width: '140%',
                maxWidth: 1050,
                zIndex: 2,
              }}
            />
          </Box>
        </Box>

        {/* ====== Features Section ====== */}
        <Box
          component="section"
          sx={{
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, flexDirection: { xs: 'column', md: 'row' },}}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mr: 1,  }}>
              Planeje seus semestres com 
            </Typography>
            <Logo />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 5,
            }}
          >
            {[
              {
                title: 'PLANEJE SUA GRADE',
                desc: 'Arraste as disciplinas entre os períodos para montar seus semestres ideais. Planeje as optativas que fará ao longo do curso para completar uma ou mais ênfases de formação.',
                img: exemplo1,
                posH: '50%',
                posV: '50%',
                zoom: '150%'
              },
              {
                title: 'ACOMPANHE O PROGRESSO',
                desc: 'Veja quantos créditos faltam para alcançar o tão sonhado diploma. Adicione as disciplinas que faltam para atingir a quantidade necessária de créditos.',
                img: exemplo2,
                posH: '58%',
                posV: '3%',
                zoom: '500%'
              },
              {
                title: 'EXPLORE POSSIBILIDADES',
                desc: 'Visualize toda a cadeia de pré-requisitos de uma disciplina. Use as informações com sabedoria, para montar uma grade estratégica que facilite a conclusão do curso.',
                img: exemplo3,
                posH: '50%',
                posV: '50%',
                zoom: '270%'
              },
            ].map((f, i) => (
              <Card
                key={i}
                sx={{
                  flex: 1,
                  bgcolor: 'rgb(194, 220, 245, 0.2)',
                  boxShadow: 'none',
                  borderRadius: 3,
                  textAlign: 'center',
                  p: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'justify', px: 2, mt: 2, flex: 1 }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, px: 2, opacity: 0.8, textAlign: 'justify', fontSize: '13px', flex: 2 }}>
                  {f.desc}
                </Typography>
                <CardContent sx={{ px: 2, py: 2, flex: 2}}>
                <Box
                  sx ={{
                    width: '100%',
                    height: 260,                 // quanto de altura você quer exibir
                    backgroundImage: `url(${f.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${f.posH} ${f.posV}`,
                    backgroundSize: `${f.zoom} auto`, // zoom de 200% na largura; ‘auto’ preserva proporção
                    borderRadius: 3,
                  }}
                />

                </CardContent>
              </Card>
            ))}
          </Box>

          <Button
            variant="outlined"
            size="large"
            sx={{
              mt: 6,
              backgroundColor: '#2A85CD',
              color: '#FFFFFF',
              borderRadius: '50px',
              px: 4,
              py: 1,
              fontWeight: 'bold',
            }}
            onClick={() => window.location.href = '/login'}
          >
            ACESSE COM ID USP
          </Button>
        </Box>

        {/* ====== Sobre o Projeto ====== */}
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            mt: 8,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 4, fontSize: '48px' }}>
              Sobre o projeto
            </Typography>
            <Typography variant="body1" sx={{ mb: 6, opacity: 0.8, fontSize: '18px', mt: 2, textAlign: 'justify' }}>
            O sistema Aurora foi criado por estudantes da USP, em sua maioria do curso de Ciência da Computação. O projeto foi desenvolvido em parceria com o Apoio Institucional do IME-USP e com incentivo do Prêmio PIPA 2024 e 2025.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ borderRadius: '50px', px: 5, py: 1, backgroundColor: '#8DC0EC', color: "#1B68AE", fontWeight: 'bold', mt: 2 }}
              onClick={() => window.location.href = 'https://github.com/usp-aurora/Aurora'}
            >
              Contribua no GitHub
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
            }}
          >
            <Box
              sx ={{
                display: { xs: 'none', md: 'block' },
                maxWidth: '100%',
                height: '60vh',                 // quanto de altura você quer exibir
                backgroundImage: `url(${laptopFrente})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `center center`,
                backgroundSize: `140% auto`, // zoom de 200% na largura; ‘auto’ preserva proporção
                borderRadius: 3,
                mb: {xs : 0, md: 8}
              }}
            />
          </Box>
        </Box>

        {/* ====== Footer ====== */}
        <Box
          component="footer"
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ opacity: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '25px' }}>
            © 2025 <Logo sx={{ ml: 1 }} />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
