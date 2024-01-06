import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface TTask {
    id: number;
    title: string,
    favorite: boolean;
}

interface FetchTasksResponse {
    tasks: TTask[];
}

const initialState: { list: TTask[] } = {
    list: [],
};

// export const fetchTasks = createAsyncThunk<FetchTasksResponse, void>(
//     'todos/fetchTasks',
//     async () => {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
//         const data = await response.json();
//         return data;
//     }
// );

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTasks: (state, action: PayloadAction<any>) => {
            state.list.push(...action.payload);
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const todo = state.list.find(item => item.id === action.payload);
            if (todo) {
                todo.favorite = !todo.favorite;
            }
        },
        updateTitle: (state, action: PayloadAction<{ id: number; updateTitle: string }>) => {
            const todo = state.list.find(item => item.id === action.payload.id);
            if (todo) {
                todo.title = action.payload.updateTitle;
            }
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((item: TTask) => item.id !== action.payload);
        },
        cloneTask: (state, action: PayloadAction<number>) => {
            const taskToClone = state.list.find((item) => item.id === action.payload);
            if (taskToClone) {
                const clonedTask: any = {
                    ...taskToClone
                };
                state.list.push(clonedTask);
            }
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<FetchTasksResponse>) => {
    //             state.list = action.payload;
    //         });
    // }
});

export const { addTasks, toggleFavorite, removeTask, cloneTask, updateTitle } = todoSlice.actions;

export default todoSlice.reducer;
