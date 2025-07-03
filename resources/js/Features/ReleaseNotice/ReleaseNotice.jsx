import { useState } from "react";
import { Typography, List, ListItem, ListItemText, Stack } from "@mui/material";
import Button from "../../ui/Button/Button";
import Dialog from "../../ui/Dialog/Dialog";

function ReleaseNoticeDialog({ versionInfo }) {
    const [showReleaseNotice, setShowReleaseNotice] = useState(versionInfo.shouldShowReleaseNotice);
    const versionInfoData = versionInfo.versionInfo;

    function dismissReleaseNotice() {
        setShowReleaseNotice(false);
    }

    const dialogContent = (
        <>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.7, fontStyle: 'italic' }}>
                Lançado em: {versionInfoData.releaseDate}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
                {versionInfoData.description}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                Confira as mudanças dessa versão:
            </Typography>
            <List>
                {versionInfoData.changelog.map((note, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`• ${note}`}
                        />
                    </ListItem>
                ))}
            </List>

            <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                Continue explorando as funcionalidades da plataforma!
            </Typography>
        </>
    );

    return (
        <Dialog
            open={showReleaseNotice}
            onClose={dismissReleaseNotice}
            title={`Bem-vindo à versão ${versionInfoData.version} do Aurora!`}
            content={dialogContent}
            actions={
                <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
                    <Button onClick={dismissReleaseNotice} variant="contained">
                        Entendi
                    </Button>
                </Stack>
            }
        />
    );
}

export default ReleaseNoticeDialog;
