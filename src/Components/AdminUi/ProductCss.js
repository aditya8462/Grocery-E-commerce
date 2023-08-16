import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
       
        width:'100vw'

    },
    box: {
        padding: 20,
        margin: 10,
        background: '#dfe6e9',
        width: 800,
        borderRadius: 10

    },
    headingStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Poppins',
        letterSpacing: 1

    },
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    myDropZone: {
        position: 'relative',
        width: '50%',
        height: '100%',
       
        backgroundColor: '#F0F',
      
    },

    test1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF0000',
        justifyContent: 'center',
    },

    test2: {
        backgroundColor: '#23C5CA',
        objectFit: 'cover',
        width: '50%',
        height: '10%'
    },

    test3: {
        objectFit: 'cover',
        color: '#A2CA23',
        backgroundColor: '#A2CA23',
        padding: '0px',
        margin: '0px',
        border: '0px',
    }

})

