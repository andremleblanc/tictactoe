import { Board } from '@mapistry/take-home-challenge-shared';

interface Props {
    isDisabled: boolean,
    handleClick(): void,
    value: Board[number]
}

export const Square = ({ isDisabled, handleClick, value }: Props) => (
    <td className="square">
        <button disabled={isDisabled} type='button' onClick={() => handleClick()}>{ value }</button>
    </td>
)