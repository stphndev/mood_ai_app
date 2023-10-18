import { db } from '@/drizzle/db'
import { analysis, journalEntries } from '@/drizzle/schema'
import { analyze } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserFromClerkID()

  const newEntry = await db
    .select()
    .from(journalEntries)
    .where(
      and(
        eq(journalEntries.userId, user[0].id),
        eq(journalEntries.content, 'Write about your daily mood!')
      )
    )
  if (newEntry.length === 0) {
    await db
      .insert(journalEntries)
      .values({ userId: user[0].id, content: 'Write about your daily mood!' })
  }

  // const entry = await prisma.journalEntry.create({
  //     data: {
  //         userId: user.id,
  //         content: 'Write about your daily mood!',
  //     }
  // })

  const entry = await db
    .select()
    .from(journalEntries)
    .where(
      and(
        eq(journalEntries.userId, user[0].id),
        eq(journalEntries.content, 'Write about your daily mood!')
      )
    )

  const myAnalysis = await analyze(entry[0].content)
  //   await prisma.analysis.create({
  //     data: {
  //       userId: user.id,
  //       entryId: entry.id,
  //       ...analysis,
  //     },
  //   })
  await db
    .insert(analysis)
    .values({ userId: user[0].id, entryId: entry[0].id, ...myAnalysis })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
