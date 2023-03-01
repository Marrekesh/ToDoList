import {userReducer} from "./user-reducer";

test('testing age count inc', () => {
    const startState = {age: 28, childrenCount: 0, name: 'Dima'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(29)
    expect(endState.childrenCount).toBe(0)

})

test('testing age count inc', () => {
    const startState = {age: 28, childrenCount: 0, name: 'Dima'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(28)
    expect(endState.childrenCount).toBe(1)

})