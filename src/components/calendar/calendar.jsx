// eslint-disable-next-line dirnames/match-kebab-case
import React, { useState } from 'react';

import { useCalendar } from './hooks/use-calendar';
import { checkDateIsEqual, checkIsLast, checkIsToday, checkIsTomorrow, checkWeekend } from './helpers';

import './calendar.scss';

export const Calendar = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
  setDisabledButton,
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });

  const [selectedDay, setSelectedDay] = useState(date);

  return (
    <div className='calendar' data-test-id='calendar'>
      <div className='calendar__header'>
        {state.mode === 'days' && (
          <div
            className='calendar__header-month'
            data-test-id='month-select'
            aria-hidden={true}
            onClick={() => functions.setMode('monthes')}
          >
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'monthes' && (
          <div
            className='calendar__header-month'
            data-test-id='month-select'
            aria-hidden={true}
            onClick={() => functions.setMode('years')}
          >
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div className='calendar__header-month'>
            {state.selectedYearsInterval[0]} - {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )}
        <div className='calendar__wrap-arrow'>
          <div
            data-test-id='button-prev-month'
            aria-hidden={true}
            className='calendar__header__arrow__left'
            onClick={() => functions.onClickArrow('left')}
          />
          <div
            data-test-id='button-next-month'
            aria-hidden={true}
            className='calendar__header__arrow__right'
            onClick={() => functions.onClickArrow('right')}
          />
        </div>
      </div>
      <div className='calendar__body'>
        {state.mode === 'days' && (
          <React.Fragment>
            <div className='calendar__week__names'>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className='calendar__days'>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isTomorrow = checkIsTomorrow(day.date);
                const isWeekend = checkWeekend(day.date);
                const isSelectedDay = date && checkDateIsEqual(day.date, state.selectedDay.date);
                const isLastDay = checkIsLast(day.date);

                return (
                  <div
                    data-test-id='day-button'
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden={true}
                    onClick={() => {
                      if (!isWeekend && !isLastDay) {
                        functions.setSelectedDay(day);
                        selectDate(day.date);
                        setDisabledButton(false);
                        if (date) {
                          if (!checkDateIsEqual(day.date, date)) {
                            setDisabledButton(false);
                          }
                        } else {
                          setSelectedDay(day.date);
                        }
                      }
                    }}
                    className={[
                      'calendar__day',

                      isWeekend && selectedDay !== day.date ? 'calendar__weekend__item' : '',

                      selectedDay === day.date ? 'selected__item_without' : '',
                      isTomorrow && !isSelectedDay && selectedDay !== day.date ? 'calendar__tomorrow' : '',
                      !isTomorrow && !isSelectedDay && selectedDay !== day.date && !isToday ? 'calendar__disabled' : '',
                      isToday && !isSelectedDay && selectedDay !== day.date ? 'calendar__today__item' : '',
                      isSelectedDay ? 'calendar__selected__item' : '',
                      isSelectedDay ? 'calendar__selected' : '',
                    ].join(' ')}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
        {state.mode === 'monthes' && (
          <div className='calendar__pick__items__container'>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.month}
                  aria-hidden={true}
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={[
                    'calendar__pick__item',
                    isSelectedMonth ? 'calendar__selected__item' : '',
                    isCurrentMonth ? 'calendar__today__item' : '',
                  ].join(' ')}
                >
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className='calendar__pick__items__container'>
            <div className='calendar__unchoosable__year'>{state.selectedYearsInterval[0] - 1}</div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden={true}
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('monthes');
                  }}
                  className={[
                    'calendar__pick__item',
                    isCurrentYear ? 'calendar__today__item' : '',
                    isSelectedYear ? 'calendar__selected__item' : '',
                  ].join(' ')}
                >
                  {year}
                </div>
              );
            })}
            <div className='calendar__unchoosable__year'>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
