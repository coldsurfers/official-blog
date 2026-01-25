import { media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MoveLeft, MoveRight } from 'lucide-react';

export const PageMoveButton = styled.button`
  background: initial;
  border: 1px solid ${semantics.color.border[1]};
  border-radius: 8px;
  background-color: ${semantics.color.background[3]};
  cursor: pointer;
  width: 54px;
  height: 54px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.medium(css`
    width: 36px;
    height: 36px;
  `)}
`;

export const MoveLeftIcon = styled(MoveLeft)`
  color: ${semantics.color.foreground[1]};

  ${media.medium(css`
    width: 18px;
    height:18px;
  `)}
`;
export const MoveRightIcon = styled(MoveRight)`
  color: ${semantics.color.foreground[1]};
  ${media.medium(css`
    width: 18px;
    height:18px;
  `)}
`;

export const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 2.5rem;

  gap: 1rem;

  ${media.medium(css`
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    gap: 0.5rem;
  `)}
`;
