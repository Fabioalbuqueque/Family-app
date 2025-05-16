import styled from 'styled-components'

export const StylesMain = styled.main`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`

export const StylesHeader = styled.header`
  width: 100%;
  background-color: white;
  padding: 1rem ;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-Direction: column;
`

export const StylesTitle = styled.h1`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
`

export const StylesUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const StylesUserName = styled.span`
  color: #333;
  font-weight: bold;
  margin-bottom: 0.25rem;
  font-size: 25px;
`

export const StylesUserEmail = styled.span`
  color: #666;
  font-size: 0.875rem;
`

export const StylesLogoutButton = styled.button`
width: 70px;
height:30px;
color: white;
  border: none;
  
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 1rem;
  background-color: #dc3545;
  &:hover {
    background-color: #dc3545;
    transform: translateY(-2px);
  }

`

export const StylesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

export const StylesSummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`

export const StylesSummaryCard = styled.div`
  background-color: white;
  height: 70px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5px;
`

export const StylesSummaryTitle = styled.h3`
  color: #666;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`

export const StylesSummaryValue = styled.p`
  color: ${props => {
    if (props.type === 'saldo') return '#007bff'
    if (props.type === 'entrada') return '#28a745'
    return '#dc3545'
  }};
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`

export const StylesAddButton = styled.button`
width: 70px;
height:30px;
color: white;
  border: none;
  padding: 0.2rem ;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 1rem;
  background-color: #218838;
  &:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }
`

export const StylesActivitiesList = styled.div`
  margin-top: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`

export const StylesActivitiesTitle = styled.h2`
  color: #333;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #007bff;
`

export const StylesActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`

export const StylesActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const StylesActivityDescription = styled.span`
  color: #333;
  font-size: 1rem;
`

export const StylesActivityDate = styled.span`
  color: #666;
  font-size: 0.875rem;
`

export const StylesActivityValue = styled.span`
  font-weight: bold;
  color: ${props => props.type === 'receita' ? '#28a745' : '#dc3545'};
`

export const StylesNoActivities = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
`

export const StylesModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const StylesModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  position: relative;
`

export const StylesModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

export const StylesModalClose = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`

export const StylesModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StylesModalInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &[type="checkbox"] {
    width: auto;
    margin-right: 8px;
    cursor: pointer;
  }
`

export const StylesModalSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const StylesModalButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`

export const StylesActivityActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const StylesEditButton = styled.button`
  background-color: #ffc107;
  color: #333;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0a800;
  }
`

export const StylesSaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #218838;
  }
`

export const StylesCancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #c82333;
  }
`

export const StylesActivityEditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

export const StylesActivityEditInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const StylesActivityEditSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const StylesPayButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`

export const StylesDeleteButton = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background-color: #cc0000;
  }
`

export const StylesPasswordModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const StylesPasswordModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
`

export const StylesPasswordModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

export const StylesPasswordModalTitle = styled.h2`
  color: #333;
  font-size: 1.25rem;
  margin: 0;
`

export const StylesPasswordModalClose = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`

export const StylesPasswordModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StylesPasswordModalInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const StylesPasswordModalButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`

export const StylesPasswordModalError = styled.p`
  color: #dc3545;
  font-size: 0.875rem;
  margin: 0;
`

export const StylesCheckboxLabel = styled.label`
  color: #333;
  font-size: 1rem;
  cursor: pointer;
` 
