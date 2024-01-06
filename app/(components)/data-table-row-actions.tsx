"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "../(data)/data"
import { taskSchema } from "../(data)/schema"

import { useState, useEffect } from 'react'
import { TTask, addTasks, removeTask, toggleFavorite, cloneTask, updateTitle } from '../../lib/features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { RootState } from '../../lib/store';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)
  const { id }: any = row.original;
  const [newTitle, setNewTitle] = useState<string>('');
  const dispatch = useAppDispatch();

  const clickHandler = ({ type }: { type: string }) => {

    if (type === 'delete') {
      dispatch(removeTask(id));
    }
    if (type === 'favorite') {
      dispatch(toggleFavorite(id));
    }
    if (type === 'clone') {
      dispatch(cloneTask(id));
    }
    if (type === 'update') {
      dispatch(updateTitle({ id, updateTitle: newTitle }));
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => clickHandler({ type: 'clone' })}>Make a copy</DropdownMenuItem>
        <DropdownMenuItem onClick={() => clickHandler({ type: 'favorite' })}>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => clickHandler({ type: 'delete' })}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
