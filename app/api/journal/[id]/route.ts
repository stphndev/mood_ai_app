import { db } from '@/drizzle/db'
import { journalEntries, analysis } from '@/drizzle/schema'
import { analyze } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { content } = await request.json()
  const user = await getUserFromClerkID()

  await db
    .update(journalEntries)
    .set({ content: content })
    .where(eq(journalEntries.id, params.id))
    .where(eq(journalEntries.userId, user[0].id))

  // const updateEntry = await prisma.journalEntry.update({
  //   where: {
  //     userId_id: {
  //       id: params.id,
  //       userId: user.id,
  //     },
  //   },
  //   data: {
  //     content,
  //   },
  // })

  const updateEntry = await db
    .select()
    .from(journalEntries)
    .where(eq(journalEntries.id, params.id))
    .limit(1)

  const myAnalysis = await analyze(updateEntry[0].content)

  // const updated = await prisma.analysis.upsert({
  //   where: {
  //     entryId: updateEntry.id,
  //   },
  //   create: {
  //     userId: user.id,
  //     entryId: updateEntry.id,
  //     ...myAnalysis,
  //   },
  //   update: myAnalysis,
  // })

  const updated = await db
    .insert(analysis)
    .values({ userId: user[0].id, entryId: updateEntry[0].id, ...myAnalysis })

  console.log(updated)

  return NextResponse.json({ data: { ...updateEntry, analysis: updated } })
}
