import React from 'react';
import Calendar from 'react-calendar';
import { MovieList } from './components/MovieList/MovieList';

import televisor from './styles/images/televisor.png';

import { getApi } from './components/api';

import './App.css';
import 'react-calendar/dist/Calendar.css';

const filterShows = (shows = [], selectedDay) => shows
  .filter(show => show.airdate === selectedDay
    .toLocaleString()
    .slice(0, -10)
    .split('.')
    .reverse()
    .join('-'));

class App extends React.Component {
  state = {
    selectedDay: '',
    isSelected: false,
    shows: [],
  };

  componentDidMount() {
    getApi('/schedule/full').then(result => this.setState({ shows: result }));
  }

  onDaySelected = (selected) => {
    this.setState({
      selectedDay: selected,
      isSelected: true,
    });
  }

  goBack = () => {
    this.setState({
      selectedDay: '',
      isSelected: false,
    });
  }

  render() {
    let preparedShows = [];

    const {
      selectedDay,
      isSelected,
      shows,
    } = this.state;

    const formattedDate = selectedDay.toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).slice(0, -3);

    if (isSelected) {
      preparedShows = filterShows(shows, selectedDay);
    }

    return (
      <>
        <header className="container header">
          <div className="header__title">
            <h1 className="header__title header__title--text">SUPER FILM</h1>
          </div>
        </header>
        {!isSelected
          ? (
            <>
              <section className="block">
                <div className="block__start start">
                  <div>
                    <img
                      className="start__img"
                      src={televisor}
                      alt="tv"
                    />
                  </div>
                  <p className="start__text">
                    Для получения списка сериалов, пожалуйста,
                    выберите необходимый месяц и день
                  </p>
                </div>
              </section>

              <Calendar onClickDay={this.onDaySelected} />
            </>
          )
          : (
            <>
              <div className="content__date date">
                <h1 className="date__text">
                  {formattedDate}
                </h1>
              </div>
              <button
                type="button"
                onClick={this.goBack}
                className="header__button button"
              />
              <div className="content">
                <MovieList preparedShows={preparedShows} />
              </div>
            </>
          )
        }
      </>
    );
  }
}

export default App;
