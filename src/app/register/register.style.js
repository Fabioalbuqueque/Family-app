import styled from 'styled-components'

export const StylesMain = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`

export const StylesForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StylesTitle = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`

export const StylesInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 50px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const StylesButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

export const StylesError = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const StylesSuccess = styled.p`
  color: #28a745;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const StylesLink = styled.p`
  text-align: center;
  color: #666;
  margin-top: 1rem;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
` 
