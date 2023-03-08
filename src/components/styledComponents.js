import styled from 'styled-components'

export const Button = styled.button`
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`

export const LoginButton = styled(Button)`
  border-width: 0;
  background-color: #4f46e5;
  color: white;
  width: 250px;
  height: 30px;
`

export const LogoutButton = styled(Button)`
  border-style: solid;
  border-width: 1px;
  background-color: transparent;
  border-color: #4f46e5;
  width: 100px;
  height: 30px;
`

export const ThemeButton = styled(Button)`
  background-color: transparent;
  border-color: #4f46e5;
`

export const MarginDiv = styled.div`
  margin: 10px;
`

export const ConfirmButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0;
  background-color: #4f46e5;
  color: white;
  height: 30px;
  margin: 5px;
  font-size: 20px;
  padding: 10px;
`
export const CancelButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  background-color: transparent;
  border-style: solid;
  border-color: #4f46e5;
  height: 30px;
  margin: 5px;
  font-size: 20px;
  padding: 10px;
`
export const GetItNow = styled(Button)`
  border-style: solid;
  border-width: 1px;
  background-color: transparent;
  border-color: black;
  width: 100px;
  height: 30px;
`
export const CloseBannerButton = styled(Button)`
  border-style: solid;
  border-width: 1px;
  background-color: transparent;
  border-color: black;
`
export const SearchBarButton = styled(Button)`
  background-color: transparent;
  height: 30px;
  width: 50px;
  border-width: 0.1px;
`

export const RetryButton = styled(Button)`
  border-width: 0;
  background-color: #4f46e5;
  color: white;
  height: 30px;
  margin: 5px;
`

export const LikeDislikeSaveButton = styled(Button)`
  background-color: transparent;
  border-width: 0;
`
