import {appActions, appSlice, InitialState} from "modules/app/model/appSlice";


let startState: typeof InitialState

beforeEach(() => {
    startState = {
        error: null as string | null,
        status: 'idle',
        initialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appSlice(startState, appActions.setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

