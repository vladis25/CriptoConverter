import { styled } from '@mui/material/styles';

export const useStyles = styled((theme) => ({
  wrapper: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  selector: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: 10,
    fontSize: 18,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  result: {
    marginTop: 15,
    fontSize: 16,
    color: '#red',
  },
}));

