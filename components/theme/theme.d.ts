declare module '@mui/material/styles' {
    interface Components extends Record<string, any> {
        MuiDataGrid?: {
            styleOverrides?: {
                root?: any;
                columnHeaders?: any;
                cell?: any;
                // Add other DataGrid parts if needed
            };
        };
    }
}
