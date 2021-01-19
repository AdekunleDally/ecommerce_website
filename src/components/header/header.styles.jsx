import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
//import { css } from 'styled-components';

const OptionContainerStyles=css`
   padding: 10px 15px;
   cursor:pointer;
`

export const HeaderContainer=styled.div`
   height: 70px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   margin-bottom: 25px;
`

export const LogoContainer=styled(Link)`
   height: 100%;
   width: 70px;
   //  padding: 0px 80px;
   padding: 25px;
`

export const OptionsContainer=styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const OptionLink=styled(Link)`
  ${OptionContainerStyles}
`
export const OptionDiv=styled.div`
  ${OptionContainerStyles}
`