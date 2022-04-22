import styled from "styled-components";

export const Container = styled.div`
    margin-top: 4rem;

    table{
        width: 100%;
        border-spacing: 0 0.5rem;

        th{
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }


        td{
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;

            &:first-child{
                color: var(--text-title);
            }

            &.withdraw{
                color: var(--red);
            }
            &.deposit{
                color: var(--green);
            }

            &:last-child{
                display: flex;
                align-items: center;
            }

            button{
                border: 0;
                height: 2rem;
                width: 100%;
                padding: 0 1rem;
                border-radius: 0.25rem;
                margin: 0 0.25rem;
                background: transparent;
                transition: 0.2s;

                img{
                    width: 15px;
                }
                
                &.edit:hover{
                    background: var(--background);
                }
                &.delete:hover{
                    background: var(--red);
                    img{
                        filter: invert(1);
                    }
                }
            }

        }   
    }
`

export const Filter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    input{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;
        border: 1px solid #D7D7D7;
        background: #E7E9EE;
        font-weight: 400;
        font-size: 1rem;
        margin-right: 1rem;
        &::placeholder {
            color: var(--text-body);
        }   
    }

    button{
        width: 10rem;
        height: 4rem;
        background: var(--shape);
        border: 0;
        border-radius: 0.25rem;
    }
`